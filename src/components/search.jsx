import React, { useState } from "react";
import useApi from "./functions/useApi";
import MagnifyingGlass from "../assets/images/search-icon.png";
import { SearchWrap } from "./styles/searchWrap.styled";
import { VenueCard } from "./styles/venueCard.styles";
import { Hidden } from "./styles/hidden.styles";
import PersonIcon from "../assets/images/person-icon.png";
import WifiIcon from "../assets/images/wifi-icon.png";
import ParkingIcon from "../assets/images/parking-icon.png";
import FoodIcon from "../assets/images/breakfast-icon.png";
import PetsIcon from "../assets/images/pets-icon.png";
import PlaceholderImg from "../assets/images/placeholder-image.png";
import { Loader } from "./styles/loader.styles";
import { Check } from "./styles/form.styles";
import { useEffect } from "react";

function Search () {  
    const [searchInput, setSearchInput] = useState('');
    const [wifiInput, setWifiInput] = useState(false);
    const [parkingInput, setParkingInput] = useState(false);
    const [breakfastInput, setBreakfastInput] = useState(false);
    const [petsInput, setPetsInput] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { data, isLoading, isError } = useApi(
        'https://api.noroff.dev/api/v1/holidaze/venues?sort=created',
        'GET'
      );

    useEffect(() => {
        setFilteredProducts([]);
        
        let results = data.filter((venue) => {
            if(searchInput !== ''){
                return (venue.name.toLowerCase().includes(searchInput.toLowerCase()) || venue.description.toLowerCase().includes(searchInput.toLowerCase()));
            } else {
                return venue;
            }
        });

        if (wifiInput === true) {
            results = results.filter((venue) => {
                return venue.meta.wifi;
            });
        } if (parkingInput === true) {
            results = results.filter((venue) => {
                return venue.meta.parking;
            });
        } if (breakfastInput === true) {
            results = results.filter((venue) => {
                return venue.meta.breakfast;
            });
        } if (petsInput === true) {
            results = results.filter((venue) => {
                return venue.meta.pets;
            });
        }

        setFilteredProducts(results);
    }, [wifiInput, parkingInput, breakfastInput, petsInput, data, searchInput])

    const cut20 = (line) => {
        return line.slice(0, 20) + "...";
     }
    
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

    return (
        <>
            <div className="d-flex flex-wrap gap-4 align-self-center align-items-center justify-content-center">
                <SearchWrap>
                    <img src={ MagnifyingGlass } alt="" />
                    <input onChange={(e) => setSearchInput(e.currentTarget.value)} id="searchInput" value={searchInput}></input>
                </SearchWrap>
                <div className="d-flex gap-3">
                    <div>
                        <div className="d-flex align-items-center">
                            <Check onChange={(e) => setWifiInput(e.currentTarget.checked)} id="wifi" type="checkbox"></Check>
                            <label className="fs-5 ms-2" htmlFor="wifi">Wifi</label>
                        </div>
                        <div>
                            <Check onChange={(e) => setParkingInput(e.currentTarget.checked)} id="parking" type="checkbox"></Check>
                            <label className="fs-5 ms-2" htmlFor="parking">Parking</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Check onChange={(e) => setBreakfastInput(e.currentTarget.checked)} id="breakfast" type="checkbox"></Check>
                            <label className="fs-5 ms-2" htmlFor="breakfast">Breakfast</label>
                        </div>
                        <div>
                            <Check onChange={(e) => setPetsInput(e.currentTarget.checked)} id="pets" type="checkbox"></Check>
                            <label className="fs-5 ms-2" htmlFor="pets">Pets</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    searchInput !== ``
                    ? <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
                        {filteredProducts.map((data) => (
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
                                    { data.meta.pets 
                                        ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                                        : "" }
                                </div>
                            </div>
                        </VenueCard>
                        ))}
                    </div>
                    : <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
                        {filteredProducts.map((data) => (
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
                                    { data.meta.pets 
                                        ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                                        : "" }
                                </div>
                            </div>
                        </VenueCard>
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default Search; 