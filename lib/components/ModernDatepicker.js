import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Input from '../elements/Input';
import Icon from '../elements/Icon';
import Container from '../elements/Container';
import CalendarContainer from '../elements/CalendarContainer';
import CalendarHeading from '../elements/CalendarHeading';
import SingleArrow from '../elements/SingleArrow';
import DoubleArrow from '../elements/DoubleArrow';
import DateEditor from '../elements/DateEditor';
import CalendarBody from '../elements/CalendarBody';

class ModernDatepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer : false,
      setViewFor : 'date',
      yearBlock : moment().get('year') - 8,
      dateToEdit : props.date ? moment(props.date, props.format || 'DD-MM-YYYY').format(props.format || 'DD-MM-YYYY') : '',
      isValid : props.date ? moment(props.date, props.format || 'DD-MM-YYYY').isValid() : true
    };
    this.handleDateChange = this.handleDateChange.bind(this);

  }

  handleDateChange(value, unit) {
    const { format, onChange } = this.props; 
    const { yearBlock } = this.state;
    const date = moment(this.state.dateToEdit || moment().format('DD-MM-YYYY'), format || 'DD-MM-YYYY').set(unit, value);
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    const dateToEdit = date.format(format || 'DD-MM-YYYY');
    this.setState({
      dateToEdit,
      yearBlock : newYearBlock
    });
    onChange(dateToEdit);
  }
  addDate(value, unit){
    const { format, onChange } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    const date = moment(dateToEdit || moment().format('DD-MM-YYYY'), format || 'DD-MM-YYYY').add(value, unit);
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    const newDateToEdit = date.format(format || 'DD-MM-YYYY');
    this.setState({
      dateToEdit : newDateToEdit,
      yearBlock : newYearBlock
    });
    onChange(newDateToEdit);  
  }
  subDate(value, unit){
    const { format, onChange } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    const date = moment(dateToEdit || moment().format('DD-MM-YYYY'), format || 'DD-MM-YYYY').subtract(value, unit);
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    const newDateToEdit = date.format(format || 'DD-MM-YYYY');
    this.setState({
      dateToEdit : newDateToEdit,
      yearBlock : newYearBlock
    }); 
    onChange(newDateToEdit); 
  }

  getNewYearBlock(yearBlock, value){
    let newYearBlock;
    let year = value;
    if (year < yearBlock){
      newYearBlock = year - 15;
    }
    else if (year > (yearBlock + 15)){
      newYearBlock = year;
    }
    else {
      newYearBlock = yearBlock;
    }
    return newYearBlock;
  }
  onBlur(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() =>  {
      if (!currentTarget.contains(document.activeElement)) {
        this.toggleCalendar(false);
      }
    }, 0);
    
  }
  toggleCalendar(bool) {
    const { date, format } = this.props; 
    this.setState({
      showContainer : bool,
      setViewFor : bool ? 'date' : this.state.setViewFor,
      dateToEdit : bool ? (date ? moment(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY') : '') :  this.state.dateToEdit,
      isValid : date ? moment(date, format || 'DD-MM-YYYY').isValid() : this.state.isValid
    });  
  }
  openViewFor(setViewFor){
    this.setState({
      setViewFor
    });
  }

  render() {
    const { showContainer, setViewFor, dateToEdit, isValid, yearBlock } = this.state;
    const { format, date, placeholder, showBorder, className, icon } = this.props;  
    return (
      <Container onBlur={(e) => this.onBlur(e)}>
        <Input
          className={className}
          onChange={(e) => this.handleChange(e)}
          onFocus={() => this.toggleCalendar(true)}
          placeholder={placeholder}
          showBorder={showBorder}
          type="text"
          value={date ? moment(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY') : ''}
        />
        {icon && <Icon
          icon={icon}
          onClick={() => this.toggleCalendar(true)}
        />}
        {showContainer && isValid && <CalendarContainer>
          <CalendarHeading>
            <SingleArrow
              left
              onClick={() => this.subDate(1, 'month')}
            />
            <DoubleArrow 
              left 
              onClick={() => this.subDate(1, 'year')} 
            />
            <DateEditor
              date={dateToEdit}
              format={format}  
              onDateClick={() => this.openViewFor('date')}
              onMonthClick={() => this.openViewFor('month')}
              onYearClick={() => this.openViewFor('year')}
              viewFor={setViewFor}
            />
            <SingleArrow onClick={() => this.addDate(1, 'month')} />
            <DoubleArrow onClick={() => this.addDate(1, 'year')} />
          </CalendarHeading> 
          <CalendarBody 
            date={dateToEdit}
            format={format}
            onChange={(value, unit) => this.handleDateChange(value, unit)}
            viewFor={setViewFor}
            yearBlock={yearBlock}
          />
        </CalendarContainer>}    
      </Container>
    );
  }
}

ModernDatepicker.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  format: PropTypes.string,
  onChange : PropTypes.func,
  placeholder: PropTypes.string,
  showBorder : PropTypes.bool
};

export default ModernDatepicker;
