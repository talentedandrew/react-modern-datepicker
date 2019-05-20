import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
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
  const _date = moment(date || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = moment(minDate, format || 'DD-MM-YYYY');
  const _maxDate = moment(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'days') : _date.clone().subtract(1, 'days'), maxDate ? _maxDate.clone().add(1, 'days') : _date.clone().add(1, 'days')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'days') : minDate ? _minDate.clone().add(1, 'days') : _date;
  const mainDate = date ? moment(date, format || 'DD-MM-YYYY')  : defaultDate; 
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
