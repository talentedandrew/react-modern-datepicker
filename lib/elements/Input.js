import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const DInput = styled.input`
  width:100%;
  padding: 5px;
  color: black;
  background: white;
  border: ${props => !props.showBorder ? 'none' : '1px solid'};
  border-radius: 3px;
  box-sizing : border-box;
  &:focus {
    outline: none;
  }
`;

const Input = props => {
  return (
    <DInput
      {...props} 
      className={props.className}
    />
  );
};

Input.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Input;
