import React from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
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
  pointer-events : ${props => props.isMax || props.isMin ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin ? 'default' : 'pointer'};
  background-color:${props =>props.isMax || props.isMin  ? '#eee' : props.secondaryColor};
  color:${props => props.primaryTextColor};
  opacity:${props => props.isMax || props.isMin  ? '0.4' : '1'};
  width: 60px;
`;
const SelectedSpan = styled(Span)`
  background-color:${props => props.primaryColor};
  color : ${props => props.isMax || props.isMin  ? props.primaryTextColor : props.secondaryTextColor};
  margin: 5px 15px; 
  width: 60px;
`;
const MonthView = props => {
  const { date, format, onMonthChange, maxDate, minDate, primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = props; 
  const _date = dayjs(date || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
  const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  const mainDate = date ? dayjs(date, format || 'DD-MM-YYYY')  : defaultDate; 
  const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null; 
  const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;    
  const currentMonth = mainDate.format('MMM');      
  const rawMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let months = [];
  for (let i = 0; i < rawMonths.length ; i++){
    months.push({ 
      m : rawMonths[i], 
      isMax : endDate ? mainDate.month(i).isAfter(endDate) : false,
      isMin : startDate ? mainDate.month(i).isBefore(startDate) : false,
    });
  }      
  return (
    <Wrapper>
      <Header>
        {months.map((month, k) => {
          return (
            currentMonth === month.m ? <SelectedSpan
              isMax={month.isMax}
              isMin={month.isMin}
              primaryColor = {primaryColor}
              key={k}
              onClick={() => !month.isMax && !month.isMin && onMonthChange(k)}
              primaryTextColor={primaryTextColor}
              secondaryTextColor={secondaryTextColor}
            >{month.m}</SelectedSpan> : <YSpan
              isMax={month.isMax}
              isMin={month.isMin}
              key={k}
              onClick={() => !month.isMax && !month.isMin && onMonthChange(k)}
              secondaryColor={secondaryColor}
              primaryTextColor={primaryTextColor}
              secondaryTextColor={secondaryTextColor}
            >{month.m}</YSpan>
          );
        })}
      </Header>   
    </Wrapper>
  );
};

MonthView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  maxDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onMonthChange: PropTypes.func
};
export default MonthView;
