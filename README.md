# react-modern-datepicker
A modern date picker for react library

![react-modern-datepicker](https://github.com/talentedandrew/react-modern-datepicker/blob/master/dateview.jpg "react-modern-datepicker date view")

![react-modern-datepicker](https://github.com/talentedandrew/react-modern-datepicker/blob/master/monthview.jpg "react-modern-datepicker month view")

![react-modern-datepicker](https://github.com/talentedandrew/react-modern-datepicker/blob/master/yearview.jpg "react-modern-datepicker year view")

![react-modern-datepicker](https://github.com/talentedandrew/react-modern-datepicker/blob/master/modernDatepicker.png "react-modern-datepicker year view")



## Installation

The package can be installed via NPM:

```
npm install react-modern-datepicker --save
```

This package doesn't come with any dependency other than Moment.js & styled-components. Threfore, You’ll need to install React, PropTypes separately since those dependencies aren’t included in the package. Below is a simple example of how to use the ModernDatepicker in a React view.

```js
import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';

class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <ModernDatepicker 
          date={this.state.startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}
```

### Adding your own CSS 

You can also pass your own css to style the input element.The following example shows how to style the input element using your own css.

`./App.css`

```css
//Please  note that, for this class to take the precedence over the 
//default css, we should repeat the class name like below (instead of .color, we are 
// using .color.color)
.color.color {
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 10px 10px 5px;
    border-bottom: 1px solid #ebebeb!important;
    border: none;
    box-sizing: border-box;
    margin-top: 22px;
    box-shadow: none;
    font-family: Open Sans,sans-serif;
  }
```

`./App.js`

```js
import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import './App.css';
import icon from '../assets/icon.png'; // if you want to show an icon



class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <ModernDatepicker 
          date={this.state.startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          className='color'
          icon={icon}
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}
```
### Passing min and max date

You can also pass min and max date to the component.The following example shows how to pass min and max date.

```js
import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import './App.css';
import icon from '../assets/icon.png'; // if you want to show an icon



class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <ModernDatepicker 
          date={this.state.startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          className='color'
          id="someId"
          icon={icon}
          maxDate={moment().add('1','days')}
          minDate={moment().subtract('2','days')}
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}
```
If you pass invalid min or max date, it will show the corresponding error.


### Passing Language and Label

You can also pass language and label to the component.The following example shows how to pass language and label, using props `lang` and `label`.

`./App.css`

```css
//Please  note that, for this class to take the precedence over the 
//default css, we should repeat the class name like below (instead of .color, we are 
// using .color.color)
.color.color {
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    font-size: 15px;
    font-weight: 600;
    padding: 10px 10px 10px 5px;
    border-bottom: 1px solid #ebebeb!important;
    border: none;
    box-sizing: border-box;
    margin-top: 22px;
    box-shadow: none;
    font-family: Open Sans,sans-serif;
  }
.label.label {
  font-size: 12px;
}
.icon.icon {
  bottom: 10px;
}

```

`./App.js`

```js
import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import './App.css';
import icon from '../assets/icon.png'; // if you want to show an icon



class Example extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return <ModernDatepicker 
          date={this.state.startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          className='color'
          id="someId"
          icon={icon}
          iconClass='icon'
          lang='fr'
          label='Date'
          labelClass='label'
          maxDate={moment().add('1','days')}
          minDate={moment().subtract('2','days')}
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}
```
If you pass invalid min or max date, it will show the corresponding error.




## Configuration

The most basic use of the ModernDatepicker can be described with:

```js
<ModernDatepicker date={this.state.date} onChange={this.handleChange} showBorder />
```

The default `format` prop is `DD-MM-YYYY` if not specified.

## Options

The following are the props that you can pass to `ModernDatepicker` Component :

| props        | Default           | Optional | Description  |
| ------------- |:-------------:| -----| -----|
| date      | null | true | This prop takes the date that you want to show |
| format      | 'DD-MM-YYYY'      | true |   This prop takes the format you want to set for your date |
| showBorder | false      | true |    This prop takes a boolean to show or not to show borders around the input |
| onChange | null      | false |    This props takes a function, with the date passed to its parameters |
| placeholder | null      | true |    This props takes a string to show when no date is selected |
| className | null      | true |    This props takes any external css/scss you want to use to override the default one. |
| icon | null      | true |    This props takes an image you want to add as an icon. |
| iconClass | null      | true |    This props takes any external css/scss, that you want to use to style your icon|
| maxDate | null      | true |    This props takes the maximum date. (expects you to provide the same format as the date) |
| minDate | null      | true |    This props takes the minimum date. (expects you to provide the same format as the date)|
| id | null      | true |    This props takes the id as a string, that you want to pass to the input element|
| label | null      | true |    This props takes the label as a string, that you want to show for the input element|
| labelClass | null      | true |    This props takes any external css/scss, that you want to use to style your label|
| lang | en      | true |    This props takes the language as a string, that you want to show in the calendar |
| onFocus | null      | true |    This props takes the function to call on onFocus event |
| onBlur | null      | true |    This props takes the function to call on onBlur event |

## Compatibility

### React

Compatible with the latest version of react i.e v16.3.2

Latest compatible versions:
- React 15.5 or newer: All above React-datepicker v.0.2.0

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

## License

 Apache License
 see [LICENSE](./LICENSE) for the full license.
