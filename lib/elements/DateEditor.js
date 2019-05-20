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
  const _date = moment(date || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = moment(minDate, format || 'DD-MM-YYYY');
  const _maxDate = moment(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'days') : _date.clone().subtract(1, 'days'), maxDate ? _maxDate.clone().add(1, 'days') : _date.clone().add(1, 'days')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'days') : minDate ? _minDate.clone().add(1, 'days') : _date
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


