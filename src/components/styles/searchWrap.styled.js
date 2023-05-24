import styled from "styled-components";

export const SearchWrap = styled.div`
  width: 25rem;
  height: 3rem;
  padding: 0 0 0 0.3rem;
  border-radius: 10px;
  border: solid 2px #495b70;
  background: white;
  display: flex;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 9px;
    font-size: 1.2em;
    margin: 0 0 0 0.3rem;

    :focus {
      outline: solid 2px #f18842;
    }
  }

  img {
    max-width: 100%;
    max-height: 80%;
    height: 10rem;
  }

  @media (max-width: 720px) {
    width: 18rem;
    height: 2.5rem;
  }
`;
