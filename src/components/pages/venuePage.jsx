import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import useApi from '../useApi';
import { Loader } from '../styles/loader.styles';
import PlaceholderImg from '../../assets/images/placeholder-image.png';
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";
import ProfileImg from "../../assets/images/profile-icon.png";
import { DateInput, InputGuests, PersonIconStyle, VenueImgContainer, ServicesIcons } from '../styles/venue.styling';
import { ProfileImgStyle } from '../styles/icons.styles';
import { Button } from '../styles/buttons.styles';
import { formatDate } from '../timeDate';

function VenuePage() {
  let params = useParams();

  const { data, isLoading, isError } = useApi(
    'https://api.noroff.dev/api/v1/holidaze/venues/'+params.id+'?_owner=true&_bookings=true',
    'GET'
  );

  useEffect(() => {
    document.title = `Holidaze | Venue | ${data.name}`; 
 }, [data]);
  
  if (isLoading) {
    return <main id="container d-flex flex-column p-5">
      <div className="d-flex justify-content-center mt-4">
          <Loader className="spinner-grow text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
          </Loader>
      </div>
  </main>;
  }
  
  if (isError) {
    return <main id="container d-flex flex-column p-5">
      <div className="d-flex justify-content-center mt-4">
          An error occurred. Please refresh.
      </div>
  </main>;
  }

    return <main id="container p-5">
      <div className="d-flex justify-content-center mt-4">
        <div className='col-11 col-sm-9 col-xl-7 rounded-5 overflow-hidden pb-4'>
          <div id="carouselIndicators" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              { data.media && data.media.length >= 2
                ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                : ""
              }
              { data.media && data.media.length >= 3
                ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                : ""
              }
              { data.media && data.media.length >= 4
                ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                : ""
              }
              { data.media && data.media.length >= 5
                ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                : ""
              }
            </div>
            <div className="carousel-inner">
              { data.media && data.media.length >= 1
                ? <VenueImgContainer className="carousel-item active">
                    <img src={data.media[0]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                  </VenueImgContainer>
                : <VenueImgContainer className="carousel-item">
                <img src={PlaceholderImg} className="d-block w-100" alt="accommodation" />
              </VenueImgContainer>
              }
              { data.media && data.media.length >= 2
                ? <VenueImgContainer className="carousel-item">
                    <img src={data.media[1]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                  </VenueImgContainer>
                : ""
              }
              { data.media && data.media.length >= 3
                ? <VenueImgContainer className="carousel-item">
                    <img src={data.media[2]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                  </VenueImgContainer>
                : ""
              }
              { data.media && data.media.length >= 4
                ? <VenueImgContainer className="carousel-item">
                    <img src={data.media[3]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                  </VenueImgContainer>
                : ""
              }
              { data.media && data.media.length >= 5
                ? <VenueImgContainer className="carousel-item">
                    <img src={data.media[4]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                  </VenueImgContainer>
                : ""
              }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className='d-flex flex-column'>
            <div className='row mt-4'>
              <h1 className='col-9 col-sm-10'>{data.name}</h1>
              <div className='col-3 col-sm-2 text-end'>
                <span className='fs-4'>{data.maxGuests}</span>
                <PersonIconStyle src={PersonIcon} alt='Person icon' />
              </div>
            </div>
            <div className='fs-5 mb-4'>{data.price},- per night</div>
            <form className='d-flex justify-content-between flex-wrap gap-2'>
              <div className='col d-flex justify-content-evenly'>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='dateArrival'>Date of arrival</label>
                  <DateInput id='dateArrival' type='date'></DateInput>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='dateDeparture'>Date of departure</label>
                  <DateInput id='dateDeparture' type='date'></DateInput>
                </div>
              </div>
              <div className='col d-flex justify-content-evenly align-items-end'>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='numberGuests'>Guest(s)</label>
                  <InputGuests className='d-flex'>
                    <input id='numberGuests' className='text-end'></input>
                    <img src={PersonIcon} alt='Person icon' />
                  </InputGuests>
                </div>
                <Button>Book</Button>
              </div>
            </form>
            <div>
              <h2 className='border-bottom border-dark w-100 mt-4'>Services</h2>
              <div className="d-flex justify-content-evenly my-4">
                  { data.meta && data.meta.wifi 
                      ? <div className='d-flex flex-column align-items-center'>
                          <ServicesIcons src={WifiIcon} className="card-icons" alt="wifi icon"/> 
                          <div className='mt-1 fs-5'>Wi-fi</div>
                        </div>
                      : "" }
                  { data.meta && data.meta.parking 
                      ? <div className='d-flex flex-column align-items-center'>
                          <ServicesIcons src={ParkingIcon} className="card-icons" alt="parking icon"/> 
                          <div className='mt-1 fs-5'>Parking</div>
                        </div>
                      : "" }
                  { data.meta && data.meta.breakfast 
                      ? <div className='d-flex flex-column align-items-center'>
                          <ServicesIcons src={FoodIcon} className="card-icons" alt="breakfast icon"/> 
                          <div className='mt-1 fs-5'>Breakfast</div>
                        </div>
                      : "" }
                  { data.meta && data.meta.parking 
                      ? <div className='d-flex flex-column align-items-center'>
                          <ServicesIcons src={PetsIcon} className="card-icons" alt="pets icon"/>
                          <div className='mt-1 fs-5'>Pets</div>
                        </div>
                      : "" }
              </div>
            </div>
            <div>
              <h2 className='border-bottom border-dark w-100 mt-4'>Description</h2>
              <p>{data.description}</p>
            </div>
            <div>
              <h2 className='border-bottom border-dark w-100 mt-4'>Owner</h2>
              <div className='d-flex align-items-center my-4'>
                { data.owner && data.owner.avatar
                    ?  <ProfileImgStyle>
                          <img src={data.owner.avatar} className="venue-images" alt="Venue" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                            { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                      </ProfileImgStyle>
                    : <ProfileImgStyle>
                        <img src={ProfileImg} className="venue-images" alt="Venue" />
                      </ProfileImgStyle>
                }
                { data.owner 
                    ? <div className='ms-3'>
                        <h3>{data.owner.name}</h3>
                        <div>{data.owner.email}</div>
                      </div>
                    :  ""
                }

              </div>
            </div>
            <div className='d-flex justify-content-between gap-5'>
              <div>
                Venue created: {formatDate(new Date(data.created))}
              </div>
              <div>
                Last updated: {formatDate(new Date(data.updated))}
              </div>
            </div>
          </div>
        </div>
      </div>
  </main>;
  }

  export default VenuePage;