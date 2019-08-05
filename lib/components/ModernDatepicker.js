import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
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
    this.isInstanceOfDate = props.date && Object.prototype.toString.call(props.date) === '[object Date]' && props.date instanceof Date && typeof props.date.getMonth === 'function';
    this.isMaxInstanceOfDate = props.maxDate && Object.prototype.toString.call(props.maxDate) === '[object Date]' && props.maxDate instanceof Date && typeof props.maxDate.getMonth === 'function';
    this.isMinInstanceOfDate = props.minDate && Object.prototype.toString.call(props.minDate) === '[object Date]' && props.minDate instanceof Date && typeof props.minDate.getMonth === 'function';
    this.state = {
      showContainer: false,
      setViewFor: 'date',
      // yearBlock : dayjs().get('year') - 8,
      dateToEdit: props.date ? (this.isInstanceOfDate ? dayjs(props.date).format(props.format || 'DD-MM-YYYY') : dayjs(props.date, props.format || 'DD-MM-YYYY').format(props.format || 'DD-MM-YYYY')) : '',
      isValid: props.date ? (this.isInstanceOfDate ? dayjs(props.date).isValid() : dayjs(props.date, props.format || 'DD-MM-YYYY').isValid()) : true,
      isMaxValid: props.maxDate ? (this.isMaxInstanceOfDate ? dayjs(props.maxDate).isValid() : dayjs(props.maxDate, props.format || 'DD-MM-YYYY').isValid()) : true,
      isMinValid: props.minDate ? (this.isMinInstanceOfDate ? dayjs(props.minDate).isValid() : dayjs(props.minDate, props.format || 'DD-MM-YYYY').isValid()) : true
    };
    this.state.yearBlock = dayjs(this.state.dateToEdit || dayjs().format(props.format || 'DD-MM-YYYY'), props.format || 'DD-MM-YYYY').get('year') - 8
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  checkDateInstance() {
    const isInstanceOfDate = this.props.date && Object.prototype.toString.call(this.props.date) === '[object Date]' && this.props.date instanceof Date && typeof this.props.date.getMonth === 'function',
      isMaxInstanceOfDate = this.props.maxDate && Object.prototype.toString.call(this.props.maxDate) === '[object Date]' && this.props.maxDate instanceof Date && typeof this.props.maxDate.getMonth === 'function',
      isMinInstanceOfDate = this.props.minDate && Object.prototype.toString.call(this.props.minDate) === '[object Date]' && this.props.minDate instanceof Date && typeof this.props.minDate.getMonth === 'function';
    return [isInstanceOfDate, isMaxInstanceOfDate, isMinInstanceOfDate];
  }

  handleDateChange(value, unit) {
    const { format, onChange, maxDate, minDate } = this.props;
    const { yearBlock } = this.state;
    const [, isMaxInstanceOfDate, isMinInstanceOfDate] = this.checkDateInstance();
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY');
    const defaultDate = _date.isBetween(minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date) ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;


    const date = dayjs(this.state.dateToEdit || defaultDate.format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY').set(unit, value);
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    const dateToEdit = date.format(format || 'DD-MM-YYYY');
    this.setState({
      dateToEdit,
      yearBlock: newYearBlock
    }, () => {
      onChange(dateToEdit);
      if (unit === 'date') {
        this.toggleCalendar(false);
      }
    });

  }
  addDate(value, unit) {
    const { format, onChange, maxDate, minDate } = this.props;
    const { yearBlock, dateToEdit } = this.state;
    let firstDateToBeSet = false, lastDateToBeSet = false;
    const [, isMaxInstanceOfDate, isMinInstanceOfDate] = this.checkDateInstance();
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY');
    const defaultDate = _date.isBetween(minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date) ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;



    const date = dayjs(dateToEdit || defaultDate, format || 'DD-MM-YYYY').clone().add(value, unit);
    const endDate = maxDate ? (isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY')) : null;
    const startDate = minDate ? (isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY')) : null;
    if ((maxDate && date.isAfter(endDate)) || (minDate && date.isBefore(startDate))) {
      if ((maxDate && date.isAfter(endDate)) && _maxDate.get('year') === date.get('year') && _maxDate.get('month') === date.get('month')) {
        firstDateToBeSet = true;
      } else if ((minDate && date.isBefore(startDate)) && _minDate.get('year') === date.get('year') && _minDate.get('month') === date.get('month')) {
        lastDateToBeSet = true;
      } else {
        return;
      }
    }
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    let newDateToEdit = date.format(format || 'DD-MM-YYYY');
    if (firstDateToBeSet) {
      newDateToEdit = date.startOf('month').format(format || 'DD-MM-YYYY');
    } else if (lastDateToBeSet) {
      newDateToEdit = date.endOf('month').format(format || 'DD-MM-YYYY');
    } else {
      newDateToEdit = date.format(format || 'DD-MM-YYYY');
    }
    this.setState({
      dateToEdit: newDateToEdit,
      yearBlock: newYearBlock
    });
    onChange(newDateToEdit);
  }
  subDate(value, unit) {
    const { format, onChange, maxDate, minDate } = this.props;
    const { yearBlock, dateToEdit } = this.state;
    let firstDateToBeSet = false, lastDateToBeSet = false;
    const [, isMaxInstanceOfDate, isMinInstanceOfDate] = this.checkDateInstance();
    const _date = dayjs(this.state.dateToEdit || dayjs().format(format || 'DD-MM-YYYY'), format || 'DD-MM-YYYY');
    const _minDate = isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY');
    const _maxDate = isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY');
    const defaultDate = _date.isBetween(minDate ? _minDate.clone().subtract(1, 'day') : _date.clone().subtract(1, 'day'), maxDate ? _maxDate.clone().add(1, 'day') : _date.clone().add(1, 'day')) ? _date : maxDate && _maxDate.isSameOrAfter(_date) ? _date : minDate && _minDate.isSameOrBefore(_date) ? _minDate : maxDate ? _maxDate.clone().subtract(1, 'day') : minDate ? _minDate.clone().add(1, 'day') : _date;


    const date = dayjs(dateToEdit || defaultDate, format || 'DD-MM-YYYY').clone().subtract(value, unit);
    const endDate = maxDate ? (isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY')) : null;
    const startDate = minDate ? (isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY')) : null;
    if ((maxDate && date.isAfter(endDate)) || (minDate && date.isBefore(startDate))) {
      if ((maxDate && date.isAfter(endDate)) && _maxDate.get('year') === date.get('year') && _maxDate.get('month') === date.get('month')) {
        firstDateToBeSet = true;
      } else if ((minDate && date.isBefore(startDate)) && _minDate.get('year') === date.get('year') && _minDate.get('month') === date.get('month')) {
        lastDateToBeSet = true;
      } else {
        return;
      }
    }
    const year = date.get('year');
    const newYearBlock = this.getNewYearBlock(yearBlock, year);
    let newDateToEdit = date.format(format || 'DD-MM-YYYY');
    if (firstDateToBeSet) {
      newDateToEdit = date.startOf('month').format(format || 'DD-MM-YYYY');
    } else if (lastDateToBeSet) {
      newDateToEdit = date.endOf('month').format(format || 'DD-MM-YYYY');
    } else {
      newDateToEdit = date.format(format || 'DD-MM-YYYY');
    }
    this.setState({
      dateToEdit: newDateToEdit,
      yearBlock: newYearBlock
    });
    onChange(newDateToEdit);
  }

  getNewYearBlock(yearBlock, value) {
    let newYearBlock;
    let year = value;
    if (year < yearBlock) {
      newYearBlock = year - 15;
    }
    else if (year > (yearBlock + 15)) {
      newYearBlock = year;
    }
    else {
      newYearBlock = yearBlock;
    }
    return newYearBlock;
  }
  onBlur(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
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
    const [isInstanceOfDate] = this.checkDateInstance();
    this.setState({
      showContainer: bool,
      setViewFor: bool ? 'date' : this.state.setViewFor,
      dateToEdit: bool ? (date ? (isInstanceOfDate ? dayjs(date).format(format || 'DD-MM-YYYY') : dayjs(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY')) : '') : this.state.dateToEdit,
      isValid: date ? (isInstanceOfDate ? dayjs(date).isValid() : dayjs(date, format || 'DD-MM-YYYY').isValid()) : this.state.isValid
    });
  }
  openViewFor(setViewFor) {
    this.setState({
      setViewFor
    });
  }

  checkAndReturnDate() {
    const { isValid, isMaxValid, isMinValid } = this.state;
    const { format, date, maxDate, minDate } = this.props;
    const [isInstanceOfDate, isMaxInstanceOfDate, isMinInstanceOfDate] = this.checkDateInstance();
    const currentDate = date ? (isInstanceOfDate ? dayjs(date) : dayjs(date, format || 'DD-MM-YYYY')) : '';
    const startDate = minDate ? (isMinInstanceOfDate ? dayjs(minDate) : dayjs(minDate, format || 'DD-MM-YYYY')) : null;
    const endDate = maxDate ? (isMaxInstanceOfDate ? dayjs(maxDate) : dayjs(maxDate, format || 'DD-MM-YYYY')) : null;
    if (!isValid || !isMaxValid || !isMinValid) {
      return 'Invalid date';
    }
    else if (startDate && endDate && !endDate.startOf('day').isAfter(startDate)) {
      return 'Invalid max/min date';
    }
    else if (currentDate && startDate && !startDate.startOf('day').isSameOrBefore(currentDate)) {
      return 'Invalid min date';
    }
    else if (currentDate && endDate && !endDate.startOf('day').isSameOrAfter(currentDate)) {
      return 'Invalid max date';
    }
    else if (date) {
      return isInstanceOfDate ? dayjs(date).format(format || 'DD-MM-YYYY') : dayjs(date, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY');
    }
    else {
      return '';
    }
  }

  render() {
    const { showContainer, setViewFor, dateToEdit, isValid, yearBlock } = this.state;
    const { format, placeholder, showBorder, className, id, icon, iconClass, maxDate, minDate, label, labelClass, lang, primaryColor = '#00b9f5', secondaryColor = 'white', primaryTextColor = 'black', secondaryTextColor = 'white' } = this.props;
    const [, isMaxInstanceOfDate, isMinInstanceOfDate] = this.checkDateInstance();
    const _minDate = minDate ? (isMinInstanceOfDate ? dayjs(minDate).format(format || 'DD-MM-YYYY') : dayjs(minDate, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY')) : null;
    const _maxDate = maxDate ? (isMaxInstanceOfDate ? dayjs(maxDate).format(format || 'DD-MM-YYYY') : dayjs(maxDate, format || 'DD-MM-YYYY').format(format || 'DD-MM-YYYY')) : null;
    const value = this.checkAndReturnDate();
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
          value={value}
        />
        {icon && <Icon
          className={iconClass}
          icon={icon}
          onClick={() => this.toggleCalendar(true)}
        />}
        {showContainer && isValid && (this.checkAndReturnDate() === '' || dayjs(this.checkAndReturnDate(), format || 'DD-MM-YYYY').isValid()) && <CalendarContainer secondaryColor={secondaryColor}>
          <CalendarHeading secondaryColor={secondaryColor}>
            <SingleArrow
              left
              onClick={() => this.subDate(1, 'month')}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
            />
            <DoubleArrow
              left
              onClick={() => this.subDate(1, 'year')}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
            />
            <DateEditor
              date={dateToEdit}
              format={format}
              lang={lang}
              maxDate={_maxDate}
              minDate={_minDate}
              onDateClick={() => this.openViewFor('date')}
              onMonthClick={() => this.openViewFor('month')}
              onYearClick={() => this.openViewFor('year')}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
              viewFor={setViewFor}
            />
            <SingleArrow
              onClick={() => this.addDate(1, 'month')}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
            />
            <DoubleArrow
              onClick={() => this.addDate(1, 'year')}
              primaryTextColor={primaryTextColor}
              secondaryColor={secondaryColor}
            />
          </CalendarHeading>
          <CalendarBody
            date={dateToEdit}
            format={format}
            maxDate={_maxDate}
            minDate={_minDate}
            onChange={(value, unit) => this.handleDateChange(value, unit)}
            primaryColor={primaryColor}
            primaryTextColor={primaryTextColor}
            secondaryColor={secondaryColor}
            secondaryTextColor={secondaryTextColor}
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
  lang: PropTypes.string,
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  primaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  secondaryTextColor: PropTypes.string,
  showBorder: PropTypes.bool,

};

export default ModernDatepicker;
