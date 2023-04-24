import styled from "styled-components";

const Input = styled.input`
    border: solid 1px #495B70;
    height: 2.5rem;
    border-radius: 8px;
    font-size: 1.2em;

    :focus {
        outline: solid 2px #495B70;
    }
`;

const Error = styled.div`
    color: #495B70;
    min-height: 1.2rem;
`;

const Radio = styled.input`
    accent-color: #495B70;
    transform: scale(1.32);
    height: 1.2rem;
`;

export { Input, Error, Radio };