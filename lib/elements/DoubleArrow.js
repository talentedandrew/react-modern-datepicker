import styled from 'styled-components';
const DoubleArrow = styled.span`
    width: 22px;
    height: 22px;
    border-radius: 11.3px;
    background-color: ${props => props.secondaryColor};
    display: inline-block;
    position : absolute;
    top: 0;
    cursor: pointer;
    bottom: 0;
    margin: auto;
    color: #b8c2cb;
    font-weight: bold;
    opacity: 0.4;
    ${props => props.left ? 'left' : 'right'} : 7px;
    border-radius: 50%;
    border: ${props => '2px solid ' + props.primaryTextColor};
    &:after, &:before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 5px;
        border-top: ${props => '2px solid ' + props.primaryTextColor};
        border-right: ${props => '2px solid ' + props.primaryTextColor};
        -moz-transform: ${props => props.left ? 'rotate(-135deg)' : 'rotate(45deg)'} ;
        -webkit-transform: ${props => props.left ? 'rotate(-135deg)' : 'rotate(45deg)'} ;
        transform: ${props => props.left ? 'rotate(-135deg)' : 'rotate(45deg)'} ;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
    }
    &:after{
        margin-left: 5px;
    }
    &:before{
        margin-right: 5px;
    }
`;

export default DoubleArrow;
