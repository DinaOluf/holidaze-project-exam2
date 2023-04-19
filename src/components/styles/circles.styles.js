import styled from "styled-components";

const Circle1 = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 28rem;
    height: 28rem;
    border-radius: 50%;
    background: #f188422d;
    z-index: -1;
`;

const Circle2 = styled.div`
    position: fixed;
    bottom: -2rem;
    right: -2rem;
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    background: #4958702d;
    z-index: -1;
`;

export {Circle1, Circle2};