import React from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const YSpan = styled(Span)`
  margin: 5px 15px; 
  pointer-events : ${props => props.isMax || props.isMin  ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin  ? 'default' : 'pointer'};
  background-color:${props =>props.isMax || props.isMin  ? '#eee' : props.secondaryColor};
  color:${props => props.primaryTextColor};
  opacity:${props => props.isMax || props.isMin  ? '0.4' : '1'};
`;
const SelectedSpan = styled(Span)`
  background-color:${props => props.primaryColor};
  color : ${props => props.isMax || props.isMin  ? props.primaryTextColor : props.secondaryTextColor};
  margin: 5px 15px; 
  
`;
const getYears = (year, main, end, start) => {
  let startYear = year;
  let endYear = year + 15;
  let years = [];
  for (let i = startYear; i <= endYear; i++ ){
    years.push({ 
      y : i, 
      isMax : end ? main.year(i).isAfter(end) : false ,
      isMin : start ? main.year(i).isBefore(start) : false ,
    });
  }
  return years;
};
const YearView = props => {
  const { date, format, onYearChange, yearBlock, maxDate, minDate, primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = props;  
  const _date = dayjs(date || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
  const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  const mainDate = date ? dayjs(date, format || 'DD-MM-YYYY')  : defaultDate; 
  const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null;
  const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;
  const currentYear = mainDate.get('year');
  const years= getYears(yearBlock, mainDate, endDate, startDate);
  return (
    <Wrapper>
      <Header>
        {years.map((year, k) => {
          return (
            currentYear === year.y ? <SelectedSpan 
              isMax={year.isMax}
              isMin={year.isMin}
              key={k}
              onClick={() => !year.isMax && !year.isMin && onYearChange(year.y)}
              primaryColor={primaryColor}
              primaryTextColor={primaryTextColor}
              secondaryTextColor={secondaryTextColor}
                                     >{year.y}</SelectedSpan> : <YSpan 
              isMax={year.isMax}
              isMin={year.isMin}
              key={k}
              onClick={() => !year.isMax && !year.isMin && onYearChange(year.y)}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
              secondaryTextColor={secondaryTextColor}
                                       >{year.y}</YSpan>
          );
        })}
      </Header>   
    </Wrapper>
  );
};
YearView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  maxDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onYearChange: PropTypes.func,
  primaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  yearBlock: PropTypes.number
};
export default YearView;
