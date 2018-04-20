import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
const SelectedSpan = Span.extend`
  background-color:#00b9f5;
  color : white;
`;
const MonthView = props => {
  const { date, format, onMonthChange } = props;      
  const currentMonth = date ? moment(date, format || 'DD-MM-YYYY').format('MMM') : moment().format('MMM');      
  const months = moment.monthsShort();      
  return (
    <Wrapper>
      <Header>
        {months.map((month, k) => {
          return (
            currentMonth === month ? <SelectedSpan
              key={k}
              onClick={() => onMonthChange(k)}
            >{month}</SelectedSpan> : <Span
              key={k}
              onClick={() => onMonthChange(k)}
            >{month}</Span>
          );
        })}
      </Header>   
    </Wrapper>
  );
};

MonthView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  onMonthChange: PropTypes.func
};
export default MonthView;
