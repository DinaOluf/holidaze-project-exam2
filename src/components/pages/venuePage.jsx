import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import useApi from '../useApi';
import { Loader } from '../styles/loader.styles';
import PlaceholderImg from '../../assets/images/placeholder-image.png';
import PersonIcon from "../../assets/images/person-icon.png";
// import WifiIcon from "../../assets/images/wifi-icon.png";
// import ParkingIcon from "../../assets/images/parking-icon.png";
// import FoodIcon from "../../assets/images/breakfast-icon.png";
// import PetsIcon from "../../assets/images/pets-icon.png";

function VenuePage() {
  let params = useParams();

  const { data, isLoading, isError } = useApi(
    'https://api.noroff.dev/api/v1/holidaze/venues/'+params.id+'?_owner=true&bookings=true',
    'GET'
  );

  useEffect(() => {
    document.title = `Holidaze | Venue | ${data.name}`; //make it show title after fetched from API
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

    return <main id="container d-flex flex-column p-5">
      <div className="d-flex justify-content-center mt-4">
        <div className='bg-secondary col-11 col-sm-9 col-xl-7 rounded-5 overflow-hidden'>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={PlaceholderImg} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={PlaceholderImg} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={PlaceholderImg} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className='row'>
            <h1 className='mt-4 col-11'>{data.name}</h1>
            <div className='col-1'>
              <span>{data.maxGuests}</span>
              <img src={PersonIcon} alt='Person icon' />
            </div>
            <div>{data.price},- per night</div>
          </div>
        </div>
      </div>
  </main>;
  }

  export default VenuePage;