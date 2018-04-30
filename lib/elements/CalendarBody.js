import React from 'react';
import PropTypes from 'prop-types';
import DateView from './DateView';
import MonthView from './MonthView';
import YearView from './YearView';
import Wrapper from './Wrapper';

const CalendarBody = props => {
  const { viewFor, date, format, onChange, yearBlock } = props;  
  return (
    <Wrapper>
      {viewFor === 'date' && <DateView
        date={date}
        format={format}
        onDateChange={(value) => onChange(value, 'date')}
      />}
      {viewFor === 'month' && <MonthView
        date={date}
        format={format}
        onMonthChange={(value) => onChange(value, 'month')}
      />}
      {viewFor === 'year' && <YearView
        date={date}
        format={format}
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
  onChange: PropTypes.func,
  viewFor: PropTypes.string,
  yearBlock: PropTypes.number
};

export default CalendarBody;
