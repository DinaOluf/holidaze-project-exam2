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
import PlaceholderImg from "../../assets/images/placeholder-image.png";
import useApi from "../useApi";
import { Loader } from "../styles/loader.styles";

function Home() {
    useEffect(() => {
        document.title = "Holidaze | Home"
     }, []);

     const cut20 = (line) => {
        return line.slice(0, 20) + "...";
     }

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
        <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
            <Loader className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
            </Loader>
        </div>
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
                {data.map((data) => (
                <VenueCard className="position-relative" key={data.id} to={`/venue/${data.id}`}>
                    <div className="card-img-wrap">
                        { data.media.length === 0 
                            ?  <img src={PlaceholderImg} className="venue-images" alt="Venue" />
                            :  <img src={data.media[0]} className="venue-images" alt="Venue" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }} /> 
                        }
                    </div>
                    <div className="p-2 h-50">
                        { data.name.length >= 20 
                            ? <h2 className="m-0 fs-4">{cut20(data.name)}</h2>
                            : <h2 className="m-0 fs-4">{data.name}</h2>
                        }
                        <div className="d-flex justify-content-between mb-3">
                            <div>{data.price},-</div>
                            <div className="d-flex align-items-center">
                                <div>{data.maxGuests}</div>
                                <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end my-1 gap-1">
                            { data.meta.wifi 
                                ? <img src={WifiIcon} className="card-icons" alt="wifi icon"/> 
                                : "" }
                            { data.meta.parking 
                                ? <img src={ParkingIcon} className="card-icons" alt="parking icon"/> 
                                : "" }
                            { data.meta.breakfast 
                                ? <img src={FoodIcon} className="card-icons" alt="breakfast icon"/> 
                                : "" }
                            { data.meta.parking 
                                ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                                : "" }
                        </div>
                    </div>
                </VenueCard>
                ))}
            </div>
        </main>
    )
  }

  export default Home;