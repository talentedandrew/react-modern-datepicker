import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
const Span = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: #222222;
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  line-height: 64px;
  cursor: pointer;

`;

const Wrapper = styled.div`
  min-width: 170px;
  background: white;
  text-align: center;

`;
const DateEditor = props => {
  const { onDateClick, onMonthClick, onYearClick, date, format } = props;
  const day = date ? moment(date, format || 'DD-MM-YYYY').format('DD') : moment().format('DD') ;  
  const month = date ? moment(date, format || 'DD-MM-YYYY').format('MMM') : moment().format('MMM') ;  
  const year = date ? moment(date, format || 'DD-MM-YYYY').format('YYYY') : moment().format('YYYY') ;  
  return (
    <Wrapper>
      <Span onClick={onDateClick} >{day}</Span>
      <Span onClick={onMonthClick} >{month}</Span>
      <Span onClick={onYearClick} >{year}</Span>
    </Wrapper>
  );
};
DateEditor.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  onDateClick: PropTypes.func,
  onMonthClick: PropTypes.func,
  onYearClick: PropTypes.func
};
export default DateEditor;
