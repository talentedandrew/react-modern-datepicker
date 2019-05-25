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
        primaryColor={primaryColor}
        primaryTextColor={primaryTextColor}
        secondaryColor={secondaryColor}
        secondaryTextColor={secondaryTextColor}
                             />}
      {viewFor === 'month' && <MonthView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onMonthChange={(value) => onChange(value, 'month')}
        primaryColor={primaryColor}
        primaryTextColor={primaryTextColor}
        secondaryColor={secondaryColor}
        secondaryTextColor={secondaryTextColor}
                              />}
      {viewFor === 'year' && <YearView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onYearChange={(value) => onChange(value, 'year')}
        primaryColor={primaryColor}
        primaryTextColor={primaryTextColor}
        secondaryColor={secondaryColor}
        secondaryTextColor={secondaryTextColor}
        yearBlock={yearBlock}
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
  primaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  viewFor: PropTypes.string,
  yearBlock: PropTypes.number
};

export default CalendarBody;
