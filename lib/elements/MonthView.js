import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
const YSpan = Span.extend`
  margin: 5px 15px; 
  pointer-events : ${props => props.isMax || props.isMin ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin ? 'default' : 'pointer'};
  background-color:${props => props.isMax || props.isMin ? '#eee' : '#fff'};
`;
const SelectedSpan = Span.extend`
  background-color:${props => props.isMax ? '#eee' : '#00b9f5'};
  color : ${props => props.isMax || props.isMin  ? '#000' : 'white'};
  margin: 5px 15px; 
`;
const MonthView = props => {
  const { date, format, onMonthChange, maxDate, minDate } = props; 
  const mainDate = date ? moment(date, format || 'DD-MM-YYYY') : moment(date || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment() : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(date) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(date) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days') : moment() ; 
  const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null; 
  const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;    
  const currentMonth = mainDate.format('MMM');      
  const rawMonths = moment.monthsShort();
  let months = [];
  for (let i = 0; i < rawMonths.length ; i++){
    months.push({ 
      m : rawMonths[i], 
      isMax : endDate ? mainDate.month(rawMonths[i]).isAfter(endDate) : false,
      isMin : startDate ? mainDate.month(rawMonths[i]).isBefore(startDate) : false,
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
              key={k}
              onClick={() => !month.isMax && !month.isMin && onMonthChange(k)}
            >{month.m}</SelectedSpan> : <YSpan
              isMax={month.isMax}
              isMin={month.isMin}
              key={k}
              onClick={() => !month.isMax && !month.isMin && onMonthChange(k)}
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
