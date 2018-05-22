import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Img = styled.img`
    width: 22px;
    height: 22px;
    position : absolute;
    cursor: pointer;
    bottom: 3px;
    margin: auto;
    right: 10px;
`;

const Icon = props => {
  return ( 
    <Img
      {...props}
      className={props.className}
      src={props.icon}
    /> 
  );
};
Icon.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  icon: PropTypes.string.isRequired
};
export default Icon;
