# react-modern-datepicker
A modern date picker for react library

![](https://cloud.githubusercontent.com/assets/1412392/5339491/c40de124-7ee1-11e4-9f07-9276e2545f27.png)

## Installation

The package can be installed via NPM:

```
npm install react-modern-datepicker --save
```

This package doesn't come with any dependency other than Moment.js. Threfore, You’ll need to install React, PropTypes separately since those dependencies aren’t included in the package. Below is a simple example of how to use the ModernDatepicker in a React view.

```js
import React from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

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
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select a date'}
        />
  }
}
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<ModernDatepicker date={this.state.date} onChange={this.handleChange} />
```
The default `format` prop is `DD-MM-YYYY` if not specified.

## Compatibility

### React

Compatible with the latest version of react i.e v16.3.2

Latest compatible versions:
- React 15.5 or newer: All above React-datepicker v.0.1.0

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

## License

 Apache License
 see [LICENSE](./LICENSE) for the full license.
