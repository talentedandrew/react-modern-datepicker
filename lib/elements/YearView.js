import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Wrapper from './Wrapper';
import Span from './Span';
import Header from './Header';
const YSpan = Span.extend`
  margin: 5px 15px; 
`;
const SelectedSpan = Span.extend`
  background-color:#00b9f5;
  color : white;
  margin: 5px 15px; 
`;
const getYears = (year) => {
  let startYear = year;
  let endYear = year + 15;
  let years = [];
  for (let i = startYear; i <= endYear; i++ ){
    years.push(i);
  }
  return years;
};
const YearView = props => {
  const { date, format, onYearChange, yearBlock } = props;  
  const currentYear = date ? moment(date, format || 'DD-MM-YYYY').get('year') : moment().get('year');
  const years= getYears(yearBlock);
  return (
    <Wrapper>
      <Header>
        {years.map((year, k) => {
          return (
            currentYear === year ? <SelectedSpan 
              key={k}
              onClick={() => onYearChange(year)}
            >{year}</SelectedSpan> : <YSpan 
              key={k}
              onClick={() => onYearChange(year)}
            >{year}</YSpan>
          );
        })}
      </Header>   
    </Wrapper>
  );
};
YearView.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  onYearChange: PropTypes.func,
  yearBlock: PropTypes.number
};
export default YearView;
