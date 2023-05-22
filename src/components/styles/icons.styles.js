import styled from "styled-components";

const RegisterProfileIcon = styled.img`
    width: 4rem;
    height: 4rem;
`;

const ProfileImgStyle = styled.div`
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
    overflow: hidden;

        img {
            object-fit: cover;
            min-height: 100%;
            min-width: 100%;
            max-width: 100%;
        }

    @media (max-width: 575px) {
        height: 5rem;
        width: 5rem;
    }
`

const EditIconStyle = styled.img`
    width: 28px;
    height: 28px;
    cursor: pointer;
`;

export { RegisterProfileIcon, ProfileImgStyle, EditIconStyle };