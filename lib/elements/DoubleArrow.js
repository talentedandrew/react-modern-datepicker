import styled from 'styled-components';
const DoubleArrow = styled.span`
    width: 22px;
    height: 22px;
    border-radius: 11.3px;
    background-color: #f7f8fc;
    display: inline-block;
    position : absolute;
    top: 0;
    cursor: pointer;
    bottom: 0;
    margin: auto;
    color: #b8c2cb;
    ${props => props.left ? 'left' : 'right'} : 0;
    &:after {
        content :  ${props => props.left ? '"<<"' : '">>"'};
        text-align: center;
        font-size: 12px;
        color: #b8c2cb;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
    }
`;

export default DoubleArrow;
