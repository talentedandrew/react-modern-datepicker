import styled from 'styled-components';
const CalendarContainer = styled.div.attrs({
  // we can define static props
  tabIndex: '1'
})`
    width : 100%;
    height : 315px;
    max-width : 325px;
    max-height : 315px;
    position : absolute;
    top : 100%;
    background-color : white;
    border: solid 1px #f4f4f4;
    &:focus{
        outline : none;
    }
`;
export default CalendarContainer;
