// import { Link } from "react-router-dom";
// import { Links } from "../styles/links.style";
import MagnifyingGlass from "../../assets/images/search-icon.png";
import { SearchWrap } from "../styles/searchWrap.styled";
import React, { useEffect } from 'react';
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";

function Home() {
    useEffect(() => {
        document.title = "Holidaze | Home"
     }, []);

    return (
        <main className="container d-flex flex-column">
            <h1 className="make-this-accessibly-invisible">
                Home
            </h1>
            <SearchWrap className="align-self-center">
                <img src={ MagnifyingGlass } alt="" />
                <input></input>
            </SearchWrap>
            <div className="d-flex">
                <div className="CARD">
                    <img src={PetsIcon} className="venue-images" alt="" />
                    <div>
                        <h2>Title</h2>
                        <div className="">
                            <div>price,-</div>
                            <div>
                                <div>3</div>
                                <img src={PersonIcon} alt="person icon" />
                            </div>
                        </div>
                        <div>
                            <img src={WifiIcon} alt="wifi icon"/>
                            <img src={ParkingIcon} alt="parking icon"/>
                            <img src={FoodIcon} alt="breakfast icon"/>
                            <img src={PetsIcon} alt="pets icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
  }

  export default Home;