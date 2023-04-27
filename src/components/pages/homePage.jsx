import MagnifyingGlass from "../../assets/images/search-icon.png";
import { SearchWrap } from "../styles/searchWrap.styled";
import { VenueCard } from "../styles/venueCard.styles";
import { Hidden } from "../styles/hidden.styles";
import React, { useEffect } from 'react';
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";
import HousePlaceholder from "../../assets/images/house-PLACEHOLDER.jpg";
import useApi from "../useApi";

function Home() {
    useEffect(() => {
        document.title = "Holidaze | Home"
     }, []);

     const { data, isLoading, isError } = useApi(
        'https://api.noroff.dev/api/v1/holidaze/venues',
        'GET'
      );
  
    if (isLoading) {
      return <main id="container d-flex flex-column p-5">
        <Hidden>
            <h1>
                Front page
            </h1>
        </Hidden>
        <div className='loading' aria-label='loading'></div>
    </main>;
    }
  
    if (isError) {
      return <main id='container d-flex flex-column p-5'>
        <Hidden>
            <h1>
                Front page
            </h1>
        </Hidden>
        <div className='error'>
          Error! Please refresh.
        </div>
    </main>;
    };

    console.log(data); //remove

    return (
        <main className="container d-flex flex-column p-5">
            <Hidden>
                <h1>
                    Front page
                </h1>
            </Hidden>
            <SearchWrap className="align-self-center">
                <img src={ MagnifyingGlass } alt="" />
                <input></input>
            </SearchWrap>
            <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
                <VenueCard to="/">
                    <div className="card-img-wrap"><img src={HousePlaceholder} className="venue-images" alt="Venue" /></div>
                    <div className="p-2">
                        <h2 className="m-0 fs-3">Title</h2>
                        <div className="d-flex justify-content-between mb-3">
                            <div>price,-</div>
                            <div className="d-flex align-items-center">
                                <div>3</div>
                                <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-1 gap-1">
                            <img src={WifiIcon} className="card-icons" alt="wifi icon"/>
                            <img src={ParkingIcon} className="card-icons" alt="parking icon"/>
                            <img src={FoodIcon} className="card-icons" alt="breakfast icon"/>
                            <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                        </div>
                    </div>
                </VenueCard>
                <VenueCard to="/">
                    <div className="card-img-wrap"><img src={HousePlaceholder} className="venue-images" alt="Venue" /></div>
                    <div className="p-2">
                        <h2 className="m-0 fs-3">Title</h2>
                        <div className="d-flex justify-content-between mb-3">
                            <div>price,-</div>
                            <div className="d-flex align-items-center">
                                <div>3</div>
                                <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-1 gap-1">
                            <img src={WifiIcon} className="card-icons" alt="wifi icon"/>
                            <img src={ParkingIcon} className="card-icons" alt="parking icon"/>
                            <img src={FoodIcon} className="card-icons" alt="breakfast icon"/>
                            <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                        </div>
                    </div>
                </VenueCard>
                <VenueCard to="/">
                    <div className="card-img-wrap"><img src={HousePlaceholder} className="venue-images" alt="Venue" /></div>
                    <div className="p-2">
                        <h2 className="m-0 fs-3">Title</h2>
                        <div className="d-flex justify-content-between mb-3">
                            <div>price,-</div>
                            <div className="d-flex align-items-center">
                                <div>3</div>
                                <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-1 gap-1">
                            <img src={WifiIcon} className="card-icons" alt="wifi icon"/>
                            <img src={ParkingIcon} className="card-icons" alt="parking icon"/>
                            <img src={FoodIcon} className="card-icons" alt="breakfast icon"/>
                            <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                        </div>
                    </div>
                </VenueCard>
                <VenueCard to="/">
                    <div className="card-img-wrap"><img src={HousePlaceholder} className="venue-images" alt="Venue" /></div>
                    <div className="p-2">
                        <h2 className="m-0 fs-3">Title</h2>
                        <div className="d-flex justify-content-between mb-3">
                            <div>price,-</div>
                            <div className="d-flex align-items-center">
                                <div>3</div>
                                <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-1 gap-1">
                            <img src={WifiIcon} className="card-icons" alt="wifi icon"/>
                            <img src={ParkingIcon} className="card-icons" alt="parking icon"/>
                            <img src={FoodIcon} className="card-icons" alt="breakfast icon"/>
                            <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                        </div>
                    </div>
                </VenueCard>
            </div>
        </main>
    )
  }

  export default Home;