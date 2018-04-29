import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Img = styled.img`
    width: 22px;
    height: 22px;
    position : absolute;
    top: 0;
    cursor: pointer;
    bottom: 0;
    margin: auto;
    right: 10px;
`;

const Icon = props => {
  return ( 
    <Img
      {...props}
      src={props.icon}
    /> 
  );
};
Icon.propTypes = {
  icon: PropTypes.string.isRequired
};
export default Icon;
