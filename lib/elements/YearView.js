import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
const YSpan = Span.extend`
  margin: 5px 15px; 
  pointer-events : ${props => props.isMax || props.isMin  ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin  ? 'default' : 'pointer'};
  background-color:${props => props.isMax || props.isMin  ? '#eee' : '#fff'};
`;
const SelectedSpan = Span.extend`
  background-color:${props => props.isMax || props.isMin  ? '#eee' : '#00b9f5'};
  color : ${props => props.isMax || props.isMin  ? '#000' : 'white'};
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
  const { date, format, onYearChange, yearBlock, maxDate, minDate } = props;  
  const mainDate = date ? moment(date, format || 'DD-MM-YYYY') : moment(date || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment() : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(date) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(date) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days') : moment() ; 
  const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null;
  const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;
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
            >{year.y}</SelectedSpan> : <YSpan 
              isMax={year.isMax}
              isMin={year.isMin}
              key={k}
              onClick={() => !year.isMax && !year.isMin && onYearChange(year.y)}
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
  yearBlock: PropTypes.number
};
export default YearView;
