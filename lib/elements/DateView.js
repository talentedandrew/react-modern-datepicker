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
`;
const SelectedSpan = Span.extend`
  background-color:#00b9f5;
  color : white;
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
  const { date, format, onDateChange } = props;
  const currentDate = date ? moment(date, format || 'DD-MM-YYYY').get('date') : moment().get('date');     
  const days = date ? moment(date, format || 'DD-MM-YYYY').daysInMonth(5): moment().daysInMonth(5);
  const daysToAdd = date ? moment(date, format || 'DD-MM-YYYY').startOf('month').format('e') : moment().startOf('month').format('e');
  let daysArray = [];  
  for (let i = 1; i <= days; i++) {  
    daysArray[i-1] = i;  
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
              currentDate === day ? <SelectedSpan
                key={i}
                onClick={() => onDateChange(day)}
              >{day ? day : ''}</SelectedSpan> : <DSpan
                key={i}
                onClick={() => onDateChange(day)}
              >{day ? day : ''}</DSpan>
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
  onDateChange: PropTypes.func
};
export default DateView;
