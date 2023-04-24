import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
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