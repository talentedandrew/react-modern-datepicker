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
const SelectedSpan = Span.extend`
  color: #b8c2cb;
`;
const Wrapper = styled.div`
  min-width: 170px;
  background: white;
  text-align: center;
  border-radius: 6px;
`;
const DateEditor = props => {
  const { onDateClick, onMonthClick, onYearClick, date, format, viewFor } = props;
  const day = date ? moment(date, format || 'DD-MM-YYYY').format('DD') : moment().format('DD') ;  
  const month = date ? moment(date, format || 'DD-MM-YYYY').format('MMM') : moment().format('MMM') ;  
  const year = date ? moment(date, format || 'DD-MM-YYYY').format('YYYY') : moment().format('YYYY') ;  
  return (
    <Wrapper>
      {viewFor !== 'date' ? <SelectedSpan onClick={onDateClick} >{day}</SelectedSpan> : <Span onClick={onDateClick} >{day}</Span>}
      {viewFor !== 'month' ? <SelectedSpan onClick={onMonthClick} >{month}</SelectedSpan> : <Span onClick={onMonthClick} >{month}</Span>}
      {viewFor !== 'year' ? <SelectedSpan onClick={onYearClick} >{year}</SelectedSpan> : <Span onClick={onYearClick} >{year}</Span>}
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
  onYearClick: PropTypes.func,
  viewFor: PropTypes.string,
};
export default DateEditor;
