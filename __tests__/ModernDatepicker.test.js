import React from 'react';
import ModernDatepicker from '../lib/components/ModernDatepicker';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
configure({ adapter: new Adapter() });

describe('ModernDatepicker component', () => {
  it('ModernDatepicker: renders correctly', () => {
    const onChange = jest.fn();
    const tree = renderer.create(<ModernDatepicker
      date={'25-04-2018'} 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});


test('ModernDatepicker Component calls onChange when date is changed, string date is passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={'25-04-2018'} 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );

  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith('20-04-2018');
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith('20-06-2018');
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith('20-06-2017');
});

test('ModernDatepicker Component calls onChange when date is changed, javascript date object is passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={new Date(2018,3, 25)} 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );

  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith('20-04-2018');
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith('20-06-2018');
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith('20-06-2017');
});

test('ModernDatepicker Component calls onChange when date is changed, javascript date object is passed for min, max and date', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={new Date(2018,3, 25)} 
      maxDate={new Date(2018,7, 29)}
      minDate={new Date(2018,3, 1)}
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );

  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith('20-04-2018');
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith('20-06-2018');
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith('20-06-2017');

  //when month is added
  componentInstance.addDate(5, 'month');
  expect(onChange).toBeCalledWith('20-06-2018');

  //when month is subtracted
  componentInstance.subDate(5, 'month');
  expect(onChange).toBeCalledWith('20-06-2018');

  expect(componentInstance.checkAndReturnDate()).toEqual('25-04-2018');
});

test('ModernDatepicker Component calls onChange when date is changed, dayjs date object is passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={dayjs(new Date()).format('DD-MM-YYYY')} 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith(dayjs().date(20).format('DD-MM-YYYY'));
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).format('DD-MM-YYYY'));
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).year(2017).format('DD-MM-YYYY'));
});

test('ModernDatepicker Component calls onChange when date is changed, dayjs date object is passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={dayjs()} 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith(dayjs().date(20).format('DD-MM-YYYY'));
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).format('DD-MM-YYYY'));
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).year(2017).format('DD-MM-YYYY'));
});

test('ModernDatepicker Component calls onChange when date is changed, date is not passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith(dayjs().date(20).format('DD-MM-YYYY'));
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).format('DD-MM-YYYY'));
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).year(2017).format('DD-MM-YYYY'));
});

test('ModernDatepicker Component calls onChange when date is changed, invalid date passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={'asdsad'}
      format={'DD-MM-YYYY'} 
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when invalid date is changed
  expect(componentInstance.state.isValid).toBe(false);
});

test('ModernDatepicker Component calls onChange when date is changed, invalid max date passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      format={'DD-MM-YYYY'} 
      maxDate={'asdsad'}
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when invalid max date is passed
  expect(componentInstance.state.isMaxValid).toBe(false);
});

test('ModernDatepicker Component calls onChange when date is changed, invalid min date passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      format={'DD-MM-YYYY'} 
      minDate={'asdsad'}
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when invalid min date is passed
  expect(componentInstance.state.isMinValid).toBe(false);
});


test('ModernDatepicker Component calls onChange when date is changed, same min and max date passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      format={'DD-MM-YYYY'} 
      maxDate={'02-02-2018'}
      minDate={'02-02-2018'}
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when same min and max date is passed
  expect(componentInstance.checkAndReturnDate()).toEqual('Invalid max/min date');
});

test('ModernDatepicker Component calls onChange when date is changed, invalid min and max date passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      format={'DD-MM-YYYY'} 
      maxDate={'02-02-2018'}
      minDate={'22-02-2018'}
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when same min and max date is passed
  expect(componentInstance.checkAndReturnDate()).toEqual('Invalid max/min date');
});

test('ModernDatepicker Component calls onChange when date is changed, dayjs date object, dayjs max date object & dayjs min date object is passed', () => {
  const onChange = jest.fn();
  const wrapper = shallow(
    <ModernDatepicker 
      date={dayjs()} 
      format={'DD-MM-YYYY'} 
      maxDate={dayjs().add('1','day')}
      minDate={dayjs().subtract('2','day')}
      onChange={onChange}
      placeholder={'Select a date'}
      showBorder
    />
  );
  const componentInstance = wrapper.instance();
  // when date is changed
  componentInstance.handleDateChange(20, 'date');
  expect(onChange).toBeCalledWith(dayjs().date(20).format('DD-MM-YYYY'));
  //when month is changed
  componentInstance.handleDateChange(5, 'month');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).format('DD-MM-YYYY'));
  //when year is changed
  componentInstance.handleDateChange(2017, 'year');
  expect(onChange).toBeCalledWith(dayjs().date(20).month(5).year(2017).format('DD-MM-YYYY'));
});
