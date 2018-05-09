import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const Img = styled.img`
    width: 22px;
    height: 22px;
    position : absolute;
    cursor: pointer;
    bottom: 10px;
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
