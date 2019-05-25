import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
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
  const _date = dayjs(date || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
  const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
  const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
  const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  const day = date ? dayjs(date, format || 'DD-MM-YYYY').format('DD') : defaultDate.format('DD') ;  
  const month = date ? dayjs(date, format || 'DD-MM-YYYY').format('MMM') : defaultDate.format('MMM') ;  
  const year = date ? dayjs(date, format || 'DD-MM-YYYY').format('YYYY') : defaultDate.format('YYYY') ;   
  return (
    <Wrapper>
      {viewFor === 'date' ? <SelectedSpan
        onClick={onDateClick}
        primaryTextColor={primaryTextColor}
      >{day}</SelectedSpan> : <Span
                              onClick={onDateClick}
                              primaryTextColor={primaryTextColor}
                                                    >{day}</Span>}
      {viewFor === 'month' ? <SelectedSpan
        onClick={onMonthClick}
        primaryTextColor={primaryTextColor}
      >{month}</SelectedSpan> : <Span
                               onClick={onMonthClick}
                               primaryTextColor={primaryTextColor}
                                                       >{month}</Span>}
      {viewFor === 'year' ? <SelectedSpan
        onClick={onYearClick}
        primaryTextColor={primaryTextColor}
      >{year}</SelectedSpan> : <Span
                              onClick={onYearClick}
                              primaryTextColor={primaryTextColor}
                                                     >{year}</Span>}
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
  primaryTextColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  viewFor: PropTypes.string,
};
export default DateEditor;


