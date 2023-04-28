import styled from "styled-components";

const VenueImgContainer = styled.div`
    height: 34rem;
    overflow: hidden;

        img {
            object-fit: cover;
            min-height: 100%;
            max-width: 100%;
            max-height: 100%;
        }
   
    @media (max-width: 1399px) {
        height: 26rem;
    }
        
    @media (max-width: 1199px) {
        height: 24rem;
    }

    @media (max-width: 991px) {
        height: 20rem;
    }
        
    @media (max-width: 767px) {
        height: 15rem;
    }
`;

const PersonIconStyle = styled.img`
    height: 1.8rem;
`;

const InputGuests = styled.div`
    font-size: 1.2rem;
    width: 7rem;
    height: 2.5rem;
    padding: 0 .1rem 0 0;
    border-radius: 8px;
    border: solid 2px #495B70;
    background: white;
    display: flex;
    align-items: center;

    input {
        width: 100%;
        height: 100%;
        border: 0;
        border-radius: 8px;
        font-size: 1.2em;
        margin: 0 0.1rem 0 0;

        :focus {
            outline: solid 2px #F18842;
        }
    }

    img {
        max-width: 100%;
        max-height: 80%;
        height: 10rem;
    }
`;

const DateInput = styled.input`
    font-size: 1.2rem;
    width: 10rem;
    height: 2.5rem;
    padding: 0 .1rem 0 0;
    border-radius: 8px;
    border: solid 2px #495B70;

    :focus {
        outline: solid 2px #F18842;
    }
`

const ServicesIcons = styled.img`
    height: 5rem;

    @media (max-width: 767px) {
        height: 3.5rem;
    }
`

const OwnerImg = styled.div`
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
    overflow: hidden;

        img {
            object-fit: cover;
            min-height: 100%;
            max-width: 100%;
            max-height: 100%;
        }
`

export { VenueImgContainer, PersonIconStyle, InputGuests, DateInput, ServicesIcons, OwnerImg };