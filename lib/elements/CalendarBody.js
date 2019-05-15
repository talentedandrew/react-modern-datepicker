import React from 'react';
import PropTypes from 'prop-types';
import DateView from './DateView';
import MonthView from './MonthView';
import YearView from './YearView';
import Wrapper from './Wrapper';

const CalendarBody = props => {
  const { viewFor, date, format, onChange, yearBlock, maxDate, minDate, primaryColor, secondaryColor, primaryTextColor, secondaryTextColor } = props;  
  return (
    <Wrapper secondaryColor={secondaryColor}>
      {viewFor === 'date' && <DateView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onDateChange={(value) => onChange(value, 'date')}
        primaryColor = {primaryColor}
        secondaryColor = {secondaryColor}
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
      />}
      {viewFor === 'month' && <MonthView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onMonthChange={(value) => onChange(value, 'month')}
        primaryColor = {primaryColor}
        secondaryColor = {secondaryColor}
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
      />}
      {viewFor === 'year' && <YearView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onYearChange={(value) => onChange(value, 'year')}
        yearBlock={yearBlock}
        primaryColor = {primaryColor}
        secondaryColor = {secondaryColor}
        primaryTextColor={primaryTextColor}
        secondaryTextColor={secondaryTextColor}
      />}
    </Wrapper>
  );
};

CalendarBody.propTypes = {
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
  onChange: PropTypes.func,
  viewFor: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  yearBlock: PropTypes.number
};

export default CalendarBody;
