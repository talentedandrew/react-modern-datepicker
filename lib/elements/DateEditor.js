import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
const Span = styled.span`
  font-size: 1.5em;
  text-align: center;
  color:${props => props.primaryTextColor};
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  line-height: 64px;
  cursor: pointer;
  opacity:0.4;

`;
const SelectedSpan = styled(Span)`
  color:${props => props.primaryTextColor};
  opacity:1;
`;
const Wrapper = styled.div`
  min-width: 170px;
  background: ${props => props.secondaryColor};
  text-align: center;
  border-radius: 6px;
`;
const DateEditor = props => {
  const { onDateClick, onMonthClick, onYearClick, date, format, viewFor, maxDate, minDate, lang, primaryTextColor  } = props;
  moment.locale(lang || 'en');
  const defaultDate = moment(date || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment() : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(date) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(date) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days') : moment() ;  
  const day = date ? moment(date, format || 'DD-MM-YYYY').format('DD') : defaultDate.format('DD') ;  
  const month = date ? moment(date, format || 'DD-MM-YYYY').format('MMM') : defaultDate.format('MMM') ;  
  const year = date ? moment(date, format || 'DD-MM-YYYY').format('YYYY') : defaultDate.format('YYYY') ;   
  return (
    <Wrapper>
      {viewFor === 'date' ? <SelectedSpan primaryTextColor={primaryTextColor}  onClick={onDateClick} >{day}</SelectedSpan> : <Span primaryTextColor={primaryTextColor} onClick={onDateClick} >{day}</Span>}
      {viewFor === 'month' ? <SelectedSpan primaryTextColor={primaryTextColor}  onClick={onMonthClick} >{month}</SelectedSpan> : <Span primaryTextColor={primaryTextColor} onClick={onMonthClick} >{month}</Span>}
      {viewFor === 'year' ? <SelectedSpan primaryTextColor={primaryTextColor}  onClick={onYearClick} >{year}</SelectedSpan> : <Span primaryTextColor={primaryTextColor} onClick={onYearClick} >{year}</Span>}
    </Wrapper>
  );
};
DateEditor.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  primaryTextColor: PropTypes.string,
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
  secondaryColor: PropTypes.string,
};
export default DateEditor;
