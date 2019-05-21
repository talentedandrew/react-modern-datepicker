import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';


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
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
class ModernDatepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer : false,
      setViewFor : 'date',
      // yearBlock : moment().get('year') - 8,
      yearBlock : dayjs().get('year') - 8,
      // dateToEdit : props.date ? moment(props.date, props.format || 'DD-MM-YYYY').format(props.format || 'DD-MM-YYYY') : '',
      dateToEdit : props.date ? dayjs(props.date, props.format || 'DD-MM-YYYY').format(props.format || 'DD-MM-YYYY') : '',
      isValid : props.date ? dayjs(props.date, props.format || 'DD-MM-YYYY').isValid() : true,
      isMaxValid : props.maxDate ? dayjs(props.maxDate, props.format || 'DD-MM-YYYY').isValid() : true,
      isMinValid : props.minDate ? dayjs(props.minDate, props.format || 'DD-MM-YYYY').isValid() : true
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(value, unit) {
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock } = this.state;
    // const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'day'), maxDate || moment().add(1, 'day')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ; 
    // const defaultDate = moment(this.state.dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY').isBetween( minDate ? moment(minDate, format || 'DD-MM-YYYY').subtract(1, 'day') : moment().subtract(1, 'day'), maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : moment(moment().add(1, 'day'), format || 'DD-MM-YYYY')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(moment(this.state.dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(moment(this.state.dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
    const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
    
    
    const date = dayjs(this.state.dateToEdit || defaultDate.format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY').set(unit, value);
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    const dateToEdit = date.format(format || 'DD-MM-YYYY');
    this.setState({
      dateToEdit,
      yearBlock : newYearBlock
    });
    onChange(dateToEdit);
    if (unit === 'date'){
      this.toggleCalendar(false);
    }
  }
  addDate(value, unit){
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    let firstDateToBeSet = false, lastDateToBeSet = false;
    // const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'day'), maxDate || moment().add(1, 'day')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    // const defaultDate = moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY').isBetween( minDate ? moment(minDate, format || 'DD-MM-YYYY').subtract(1, 'day') : moment().subtract(1, 'day'), maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : moment(moment().add(1, 'day'), format || 'DD-MM-YYYY')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
    const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  
    
    
    const date = dayjs(dateToEdit || defaultDate, format || 'DD-MM-YYYY').clone().add(value, unit);
    const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null;
    const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;
    if ((maxDate && date.isAfter(endDate)) || (minDate && date.isBefore(startDate))){
      if((maxDate && date.isAfter(endDate)) && dayjs(maxDate, format || 'DD-MM-YYYY').get('year') === date.get('year') && dayjs(maxDate, format || 'DD-MM-YYYY').get('month') === date.get('month')) {
        firstDateToBeSet = true;
      } else if((minDate && date.isBefore(startDate)) && dayjs(minDate, format || 'DD-MM-YYYY').get('year') === date.get('year') && dayjs(minDate, format || 'DD-MM-YYYY').get('month') === date.get('month')) {
        lastDateToBeSet = true;
      } else {
        return;
      }
    }
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    let newDateToEdit = date.format(format || 'DD-MM-YYYY');
    if(firstDateToBeSet) {
      newDateToEdit = date.startOf('month').format(format || 'DD-MM-YYYY');
    } else if (lastDateToBeSet) {
      newDateToEdit = date.endOf('month').format(format || 'DD-MM-YYYY');
    } else {
      newDateToEdit = date.format(format || 'DD-MM-YYYY');
    }
    this.setState({
      dateToEdit : newDateToEdit,
      yearBlock : newYearBlock
    });
    onChange(newDateToEdit);  
  }
  subDate(value, unit){
    const { format, onChange, maxDate, minDate } = this.props; 
    const { yearBlock, dateToEdit } = this.state;
    let firstDateToBeSet = false, lastDateToBeSet = false;
    // const defaultDate = moment(this.state.dateToEdit || moment(), format || 'DD-MM-YYYY').isBetween(minDate || moment().subtract(1, 'day'), maxDate || moment().add(1, 'day')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(this.state.dateToEdit) ? moment().format(format || 'DD-MM-YYYY') : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    // const defaultDate = moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY').isBetween( minDate ? moment(minDate, format || 'DD-MM-YYYY').subtract(1, 'day') : moment().subtract(1, 'day'), maxDate ? moment(maxDate, format || 'DD-MM-YYYY') : moment(moment().add(1, 'day'), format || 'DD-MM-YYYY')) ? moment().format(format || 'DD-MM-YYYY') : maxDate && moment(maxDate, format || 'DD-MM-YYYY').isSameOrAfter(moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : minDate && moment(minDate, format || 'DD-MM-YYYY').isSameOrBefore(moment(dateToEdit || moment().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY')) ? moment() : maxDate ? moment(maxDate, format || 'DD-MM-YYYY').subtract(1, 'day').format(format || 'DD-MM-YYYY') : minDate ? moment(minDate, format || 'DD-MM-YYYY').add(1, 'day').format(format || 'DD-MM-YYYY') : moment().format(format || 'DD-MM-YYYY') ;
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = dayjs(maxDate, format || 'DD-MM-YYYY'); 
    const defaultDate = _date.isBetween( minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date)  ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;
  
    
    const date = dayjs(dateToEdit || defaultDate, format || 'DD-MM-YYYY').clone().subtract(value, unit);
    const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null;
    const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;
    if ((maxDate && date.isAfter(endDate))  || (minDate && date.isBefore(startDate))){
      if((maxDate && date.isAfter(endDate)) && dayjs(maxDate, format || 'DD-MM-YYYY').get('year') === date.get('year') && dayjs(maxDate, format || 'DD-MM-YYYY').get('month') === date.get('month')) {
        firstDateToBeSet = true;
      } else if((minDate && date.isBefore(startDate)) && dayjs(minDate, format || 'DD-MM-YYYY').get('year') === date.get('year') && dayjs(minDate, format || 'DD-MM-YYYY').get('month') === date.get('month')) {
        lastDateToBeSet = true;
      } else {
        return;
      }
    }
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    let newDateToEdit = date.format(format || 'DD-MM-YYYY');
    if(firstDateToBeSet) {
      newDateToEdit = date.startOf('month').format(format || 'DD-MM-YYYY');
    } else if (lastDateToBeSet) {
      newDateToEdit = date.endOf('month').format(format || 'DD-MM-YYYY');
    } else {
      newDateToEdit = date.format(format || 'DD-MM-YYYY');
    }
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
  toggleCalendar(bool, e) {
    const { date, format, onFocus, onBlur } = this.props; 
    if (bool && onFocus) { 
      onFocus(e); 
    }
    else if (!bool && onBlur) {
      onBlur();
    }
    this.setState({
      showContainer : bool,
      setViewFor : bool ? 'date' : this.state.setViewFor,
      dateToEdit : bool ? (date ? dayjs(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY') : '') :  this.state.dateToEdit,
      isValid : date ? dayjs(date, format || 'DD-MM-YYYY').isValid() : this.state.isValid
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
    const currentDate = date ? dayjs(date, format || 'DD-MM-YYYY') : '';  
    const startDate = minDate ? dayjs(minDate, format || 'DD-MM-YYYY') : null;  
    const endDate = maxDate ? dayjs(maxDate, format || 'DD-MM-YYYY') : null;  
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
      // moment.locale(lang || 'en');
      return dayjs(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY');
    }
    else {
      return '';
    }
  }

  render() {
    const { showContainer, setViewFor, dateToEdit, isValid,  yearBlock } = this.state;
    const { format, placeholder, showBorder, className, id, icon, iconClass, maxDate, minDate, label, labelClass, lang, primaryColor = '#00b9f5', secondaryColor = 'white', primaryTextColor = 'black', secondaryTextColor = 'white' } = this.props;
    return (
      <Container onBlur={(e) => this.onBlur(e)} >
        {label && <Label
          className={labelClass}
          htmlFor={id}
                  >{label}</Label>}
        <Input
          className={className}
          id={id}
          onChange={(e) => e.preventDefault()}
          onFocus={(e) => this.toggleCalendar(true, e)}
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
        {showContainer && isValid && (this.checkAndReturnDate() === '' || dayjs(this.checkAndReturnDate(), format || 'DD-MM-YYYY').isValid()) &&  <CalendarContainer secondaryColor={secondaryColor}>
          <CalendarHeading secondaryColor={secondaryColor}>
            <SingleArrow
              left
              onClick={() => this.subDate(1, 'month')}
              secondaryColor={secondaryColor}
              primaryTextColor={primaryTextColor}
            />
            <DoubleArrow 
              left 
              onClick={() => this.subDate(1, 'year')}
              secondaryColor={secondaryColor} 
              primaryTextColor={primaryTextColor}
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
              secondaryColor={secondaryColor}
              primaryTextColor={primaryTextColor}
            />
            <SingleArrow onClick={() => this.addDate(1, 'month')} primaryTextColor={primaryTextColor} secondaryColor={secondaryColor} />
            <DoubleArrow onClick={() => this.addDate(1, 'year')} primaryTextColor={primaryTextColor} secondaryColor={secondaryColor} />
          </CalendarHeading> 
          <CalendarBody 
            date={dateToEdit}
            format={format}
            maxDate={maxDate}
            minDate={minDate}
            onChange={(value, unit) => this.handleDateChange(value, unit)}
            viewFor={setViewFor}
            yearBlock={yearBlock}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            primaryTextColor={primaryTextColor}
            secondaryTextColor={secondaryTextColor}
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
  lang: PropTypes.string,
  maxDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onBlur : PropTypes.func,
  onChange : PropTypes.func,
  onFocus : PropTypes.func,
  placeholder: PropTypes.string,
  showBorder : PropTypes.bool,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  
};

export default ModernDatepicker;
