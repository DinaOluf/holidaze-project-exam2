import styled from "styled-components";
import { Link } from "react-router-dom";

const NavLink = styled(Link)`
    color: black;
    text-decoration: none;
    font-size: 1.3em;

    :hover {
        color: black;
        text-decoration: underline;
    }

    @media (max-width: 767px) {
        font-size: 1.1em;
    }
`;

const NavLinkDiv = styled.div`
    color: black;
    text-decoration: none;
    font-size: 1.3em;
    cursor: pointer;

    :hover {
        color: black;
        text-decoration: underline;
    }

    @media (max-width: 767px) {
        font-size: 1.1em;
    }
`;

export { NavLink, NavLinkDiv };