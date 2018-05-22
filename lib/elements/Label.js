import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
const DLabel = styled.label`
  font-size: 15px;
  color: #000;
`;
const Label = props => {
  return (
    <DLabel
      {...props} 
      className={props.className}
    />
  );
};

Label.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Label;
