import styled from "styled-components";
import { Link } from "react-router-dom";

export const VenueCard = styled(Link)`
    background: #f1f7ff;
    border-radius: 10px;
    color: black;
    text-decoration: none;
    width: 16rem;
    font-size: 1.1rem;
    filter: drop-shadow(1px 1px 2px grey);

    :hover {
        transform: scale(1.02);
        color: black;
    }

    .card-img-wrap {
        width: 100%;
        height: 10rem;
        overflow: hidden;
        border-radius: 10px 10px 0 0;

        img {
            object-fit: cover;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
        }
    }

    .person-icon {
        height: 1.3rem;
    }

    .card-icons {
        height: 1.5rem;
    }
`;