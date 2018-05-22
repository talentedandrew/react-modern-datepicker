import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Label from '../elements/Label';
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
      isValid : props.date ? moment(props.date, props.format || 'DD-MM-YYYY').isValid() : true,
      isMaxValid : props.maxDate ? moment(props.maxDate, props.format || 'DD-MM-YYYY').isValid() : true,
      isMinValid : props.minDate ? moment(props.minDate, props.format || 'DD-MM-YYYY').isValid() : true
    };
    this.handleDateChange = this.handleDateChange.bind(this);

  }

  handleDateChange(value, unit) {
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock } = this.state;
    const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ; 
    const date = moment(this.state.dateToEdit || defaultDate, format || 'DD-MM-YYYY').set(unit, value);
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
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    const date = moment(dateToEdit || defaultDate, format || 'DD-MM-YYYY').add(value, unit);
    const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null;
    const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;
    if ((maxDate && date.isAfter(endDate))  || (minDate && date.isBefore(startDate))){
      return;
    }
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
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'days'), maxDate || moment().add(1, 'days')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'days').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'days').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    const date = moment(dateToEdit || defaultDate, format || 'DD-MM-YYYY').subtract(value, unit);
    const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null;
    const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;
    if ((maxDate && date.isAfter(endDate))  || (minDate && date.isBefore(startDate))){
      return;
    }
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

  checkAndReturnDate() {
    const { isValid, isMaxValid, isMinValid } = this.state;
    const { format, date, maxDate, minDate, lang } = this.props;
    const currentDate = date ? moment(date, format || 'DD-MM-YYYY') : '';  
    const startDate = minDate ? moment(minDate, format || 'DD-MM-YYYY') : null;  
    const endDate = maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : null;  
    if (!isValid || !isMaxValid || !isMinValid){
      return 'Invalid date';
    }
    else if (startDate && endDate && !endDate.startOf('day').isAfter(startDate)){
      return 'Invalid max/min date';
    }
    else if (currentDate && startDate && !startDate.startOf('day').isSameOrBefore(currentDate)){
      return 'Invalid min date';
    }
    else if (currentDate && endDate && !endDate.startOf('day').isSameOrAfter(currentDate)){
      return 'Invalid max date';
    }
    else if (date){
      moment.locale(lang || 'en');
      return moment(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY');
    }
    else {
      return '';
    }
  }

  render() {
    const { showContainer, setViewFor, dateToEdit, isValid,  yearBlock } = this.state;
    const { format, placeholder, showBorder, className, id, icon, iconClass, maxDate, minDate, label, labelClass, lang } = this.props;
    return (
      <Container onBlur={(e) => this.onBlur(e)}>
        {label && <Label
          className={labelClass}
          htmlFor={id}
                  >{label}</Label>}
        <Input
          className={className}
          id={id}
          onChange={(e) => e.preventDefault()}
          onFocus={() => this.toggleCalendar(true)}
          placeholder={placeholder}
          showBorder={showBorder}
          type="text"
          value={this.checkAndReturnDate()}
        />
        {icon && <Icon
          className={iconClass}
          icon={icon}
          onClick={() => this.toggleCalendar(true)}
        />}
        {showContainer && isValid && (this.checkAndReturnDate() === '' || moment(this.checkAndReturnDate(), format || 'DD-MM-YYYY').isValid()) &&  <CalendarContainer>
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
              lang={lang}
              maxDate={maxDate}  
              minDate={minDate}
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
            maxDate={maxDate}
            minDate={minDate}
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
  iconClass: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  id: PropTypes.string,
  label: PropTypes.string,
  labelClass: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  maxDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange : PropTypes.func,
  placeholder: PropTypes.string,
  showBorder : PropTypes.bool
};

export default ModernDatepicker;
