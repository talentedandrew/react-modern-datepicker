import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const DSpan = styled(Span)`
  height:30px;
  line-height: 30px; 
  margin: 0; 
  pointer-events : ${props => props.isMax || props.isMin ? 'none' : 'auto'};
  cursor : ${props => props.isMax || props.isMin  ? 'default' : 'pointer'};
  background-color:${props =>props.isMax || props.isMin  ? "#eee" : props.secondaryColor};
  color:${props => props.primaryTextColor};
  opacity:${props => props.isMax || props.isMin  ? '0.4' : '1'};
`;
const SelectedSpan = styled(Span)`
  background-color:${props => props.primaryColor};
  color : ${props => props.isMax || props.isMin  ? props.primaryTextColor : props.secondaryTextColor};
  height:30px;
  line-height: 30px; 
  margin: 0;
  opacity:${props => props.isMax || props.isMin  ? '0.4' : '1'};
`;
const HeadSpan = styled(Span)`
  color: #b8c2cb;
  font-weight: 600;
  margin: 0;
  color:${props => props.primaryTextColor};
  opacity:0.4;
`;
const Body = styled.div`
  width:100%;
  text-align : left;
  height:30px;
`;

const DateView = props => {
  const { date, format, onDateChange, maxDate, minDate, primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = props;
  const _date = dayjs(date || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
  const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  const mainDate = date ? dayjs(date, format || 'DD-MM-YYYY')  : defaultDate; 
  const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null;
  const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;
  const currentDate = mainDate.get('date');
  const days = mainDate.daysInMonth(5);
  const daysToAdd = Number(mainDate.startOf('month').format('d'));
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
        <HeadSpan primaryTextColor={primaryTextColor} >S</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >M</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >T</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >W</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >T</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >F</HeadSpan>
        <HeadSpan primaryTextColor={primaryTextColor} >S</HeadSpan>
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
                primaryColor={primaryColor}
                primaryTextColor={primaryTextColor}
                secondaryTextColor={secondaryTextColor}
                                                    >{day ? day.d : ''}</SelectedSpan> : <DSpan 
                isMax={day.isMax}
                isMin={day.isMin}
                key={i}
                onClick={() => !d.isMax && !day.isMin && onDateChange(day.d)}
                primaryColor={primaryColor}
                primaryTextColor={primaryTextColor}
                secondaryColor={secondaryColor}
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
  onDateChange: PropTypes.func,
  primaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  secondaryTextColor: PropTypes.string
};
export default DateView;
