import styled from 'styled-components';
const SingleArrow = styled.span`
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
    font-weight: bold;
    ${props => props.left ? 'left' : 'right'} : 35px;
    &:after {
        content :  ${props => props.left ? '"<"' : '">"'};
        text-align: center;
        font-size: 12px;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        color: #b8c2cb;
    }
`;

export default SingleArrow;
