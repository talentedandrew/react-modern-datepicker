import React from 'react';
import PropTypes from 'prop-types';
import DateView from './DateView';
import MonthView from './MonthView';
import YearView from './YearView';
import Wrapper from './Wrapper';

const CalendarBody = props => {
  const { viewFor, date, format, onChange, yearBlock, maxDate, minDate } = props;  
  return (
    <Wrapper>
      {viewFor === 'date' && <DateView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onDateChange={(value) => onChange(value, 'date')}
      />}
      {viewFor === 'month' && <MonthView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onMonthChange={(value) => onChange(value, 'month')}
      />}
      {viewFor === 'year' && <YearView
        date={date}
        format={format}
        maxDate={maxDate}
        minDate={minDate}
        onYearChange={(value) => onChange(value, 'year')}
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
  viewFor: PropTypes.string,
  yearBlock: PropTypes.number
};

export default CalendarBody;
