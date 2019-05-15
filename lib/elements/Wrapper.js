import styled, { keyframes } from 'styled-components';
const fadeinout = keyframes`
0% { opacity: 0; }
50% { opacity: 1; }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 250px;
  max-width: 280px;
  background: ${props => props.secondaryColor};
  text-align: center;
  box-sizing: border-box;
  margin: 0 auto;
  animation: ${fadeinout} .5s linear 1 forwards;
`;
export default Wrapper;
