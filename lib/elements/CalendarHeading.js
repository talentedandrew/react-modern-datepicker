import styled from 'styled-components';
const CalendarHeading = styled.div`
    width : 100%;
    height : 64px;
    max-width : 325px;
    max-height : 64px;
    position : relative;
    background-color : ${props => props.secondaryColor};
    border-bottom: solid 1px #f4f4f4;
    border-radius: 6px;
`;
export default CalendarHeading;
