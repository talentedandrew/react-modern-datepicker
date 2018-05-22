import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
const DSpan = Span.extend`
  height:30px;
  line-height: 30px; 
  margin: 0; 
  pointer-events : ${props => props.isMax || props.isMin ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin  ? 'default' : 'pointer'};
  background-color:${props => props.isMax || props.isMin  ? '#eee' : '#fff'};
`;
const SelectedSpan = Span.extend`
  background-color:${props => props.isMax || props.isMin  ? '#eee' : '#00b9f5'};
  color : ${props => props.isMax || props.isMin  ? '#000' : 'white'};
  height:30px;
  line-height: 30px; 
  margin: 0;
`;
const HeadSpan = Span.extend`
  color: #b8c2cb;
  font-weight: 600;
  margin: 0;
`;
const Body = styled.div`
  width:100%;
  text-align : left;
`;

const DateView = props => {
  const { date, format, onDateChange, maxDate, minDate } = props;
  const mainDate = date ? moment(date, format || 'DD-MM-YYYY')  : moment(date || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment()  : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(date) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(date) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days') : moment() ; 
  const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null;
  const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;
  const currentDate = mainDate.get('date');
  const days = mainDate.daysInMonth(5);
  const daysToAdd = mainDate.startOf('month').format('e');
  let daysArray = [];  
  for (let i = 1; i <= days; i++) {  
    daysArray[i-1] = { 
      d : i , 
      isMax : endDate ? mainDate.startOf('day').date(i).isAfter(endDate) : false ,
      isMin : startDate ? mainDate.startOf('day').date(i).isBefore(startDate) : false
    };  
  }  
  let extraDaysArray = [];  
  for (let i = 0; i < daysToAdd; i++) {  
    extraDaysArray[i] = 0;  
  }
  const totalDays =  extraDaysArray.concat(daysArray); 
  let d = [];
  let chunk = 7;
  for (let i=0,j=totalDays.length; i<j; i+=chunk) {
    d.push(totalDays.slice(i,i+chunk));
  }
  return (
    <Wrapper>
      <Header>
        <HeadSpan>S</HeadSpan>
        <HeadSpan>M</HeadSpan>
        <HeadSpan>T</HeadSpan>
        <HeadSpan>W</HeadSpan>
        <HeadSpan>T</HeadSpan>
        <HeadSpan>F</HeadSpan>
        <HeadSpan>S</HeadSpan>
      </Header>
      {d.map((week, k) => {
        return (
          <Body key={k}>{week.map((day, i) => {
            return (
              (currentDate === day.d) && !d.isMax ? <SelectedSpan
                isMax={day.isMax}
                isMin={day.isMin}
                key={i}
                onClick={() => !d.isMax && !day.isMin && onDateChange(day.d)}
              >{day ? day.d : ''}</SelectedSpan> : <DSpan 
                isMax={day.isMax}
                isMin={day.isMin}
                key={i}
                onClick={() => !d.isMax && !day.isMin && onDateChange(day.d)}
              >{day ? day.d : ''}</DSpan>
            );})}
          </Body>
        );
      })}    
    </Wrapper>
  );
};

DateView.propTypes = {
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
  onDateChange: PropTypes.func
};
export default DateView;
