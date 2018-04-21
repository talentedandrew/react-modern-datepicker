import styled from 'styled-components';
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: white;
  border: ${props => !props.showBorder ? 'none' : '1px solid'};
  border-radius: 3px;
  &:focus {
    border: ${props => !props.showBorder ? 'none' : '1px solid'};
    outline: none;
  }
`;

export default Input;
