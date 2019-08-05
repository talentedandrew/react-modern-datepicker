import styled from 'styled-components';
const CalendarContainer = styled.div.attrs({
  // we can define static props
  tabIndex: '1'
})`
    width : 100%;
    user-select: none;
    height : 315px;
    max-width : 325px;
    min-width: 315px;
    max-height : 315px;
    position : absolute;
    top : 100%;
    background-color : ${props => props.secondaryColor};
    border: solid 1px #f4f4f4;
    border-radius: 6px;
    &:focus{
        outline : none;
    }
`;
export default CalendarContainer;
