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
  const { onDateClick, onMonthClick, onYearClick, date, format, viewFor, maxDate, minDate, lang  } = props;
  moment.locale(lang || 'en');
  const defaultDate = moment(date || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment() : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(date) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(date) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days') : moment() ;  
  const day = date ? moment(date, format || 'DD-MM-YYYY').format('DD') : defaultDate.format('DD') ;  
  const month = date ? moment(date, format || 'DD-MM-YYYY').format('MMM') : defaultDate.format('MMM') ;  
  const year = date ? moment(date, format || 'DD-MM-YYYY').format('YYYY') : defaultDate.format('YYYY') ;   
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
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onDateClick: PropTypes.func,
  onMonthClick: PropTypes.func,
  onYearClick: PropTypes.func,
  viewFor: PropTypes.string,
};
export default DateEditor;
