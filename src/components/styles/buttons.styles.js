import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
    width: 12rem;
    height: 3rem;
    font-size: 1.4em;
    font-weight: bolder;
    border: 0;
    border-radius: 10px;
    background: linear-gradient(0.25turn, #F18842, #A8C5E6);
    font-family: "Mercy", Arial, Helvetica, sans-serif;
    box-shadow: 2px 2px 5px grey;


    :hover {
        border: solid 3px white;
    }
`;

const Button2 = styled.button`
    width: 12rem;
    height: 3rem;
    font-size: 1.4em;
    font-weight: bolder;
    border: 0;
    border-radius: 10px;
    background: linear-gradient(0.25turn, #9973CB, #A8C5E6);
    font-family: "Mercy", Arial, Helvetica, sans-serif;
    box-shadow: 2px 2px 5px grey;


    :hover {
        border: solid 3px white;
    }
`;

const ButtonSmaller = styled(Link)`
    width: 8rem;
    height: 2.5rem;
    font-size: 1.4em;
    font-weight: bolder;
    border: 0;
    border-radius: 10px;
    background: linear-gradient(0.25turn, #F18842, #A8C5E6);
    font-family: "Mercy", Arial, Helvetica, sans-serif;
    box-shadow: 2px 2px 5px grey;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;

    :hover {
        border: solid 3px white;
        color: black;
    }
`;

const ButtonSmaller2 = styled(Link)`
    width: 8rem;
    height: 2.5rem;
    font-size: 1.4em;
    font-weight: bolder;
    border: 0;
    border-radius: 10px;
    background: linear-gradient(0.25turn, #9973CB, #A8C5E6);
    font-family: "Mercy", Arial, Helvetica, sans-serif;
    box-shadow: 2px 2px 5px grey;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;

    :hover {
        border: solid 3px white;
        color: black;
    }
`;

export { Button, Button2, ButtonSmaller, ButtonSmaller2 };