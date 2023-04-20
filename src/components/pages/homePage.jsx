// import { Link } from "react-router-dom";
// import { Links } from "../styles/links.style";
import MagnifyingGlass from "../../assets/images/search-icon.png";
import { SearchWrap } from "../styles/searchWrap.styled";
import React, { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = "Holidaze | Home"
     }, []);

    return (
        <main className="container d-flex flex-column justify-content-center">
            <div>
                Home
            </div>
            <SearchWrap>
                <img src={ MagnifyingGlass } alt="" />
                <input></input>
            </SearchWrap>
        </main>
    )
  }

  export default Home;