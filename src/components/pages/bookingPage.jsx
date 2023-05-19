import { useParams } from 'react-router-dom';
import useApi from '../functions/useApi';
import { Loader } from '../styles/loader.styles';
import PlaceholderImg from '../../assets/images/placeholder-image.png';
import PersonIcon from "../../assets/images/person-icon.png";
import { PersonIconStyle, VenueImgContainer } from '../styles/venue.styling';
import "react-datepicker/dist/react-datepicker.css";
import EditBooking from '../editBookingForm';

function BookingPage() {
 let params = useParams();

 const { data, isLoading, isError } = useApi(
   'https://api.noroff.dev/api/v1/holidaze/bookings/'+params.id+'?_venue=true&_customer=true',
   'GET'
 );

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
             { data.venue && data.venue.media.length >= 2
               ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
               : ""
             }
             { data.venue && data.venue.media.length >= 3
               ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
               : ""
             }
             { data.venue && data.venue.media.length >= 4
               ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
               : ""
             }
             { data.venue && data.venue.media.length >= 5
               ? <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
               : ""
             }
           </div>
           <div className="carousel-inner">
             { data.venue && data.venue.media.length >= 1
               ? <VenueImgContainer className="carousel-item active">
                   <img src={data.venue.media[0]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                           { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                 </VenueImgContainer>
               : <VenueImgContainer className="carousel-item active">
               <img src={PlaceholderImg} className="d-block w-100" alt="accommodation" />
             </VenueImgContainer>
             }
             { data.venue && data.venue.media.length >= 2
               ? <VenueImgContainer className="carousel-item">
                   <img src={data.venue.media[1]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                           { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                 </VenueImgContainer>
               : ""
             }
             { data.venue && data.venue.media.length >= 3
               ? <VenueImgContainer className="carousel-item">
                   <img src={data.venue.media[2]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                           { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                 </VenueImgContainer>
               : ""
             }
             { data.venue && data.venue.media.length >= 4
               ? <VenueImgContainer className="carousel-item">
                   <img src={data.venue.media[3]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                           { e.target.onerror = null; e.target.src=PlaceholderImg; } }}/>
                 </VenueImgContainer>
               : ""
             }
             { data.venue && data.venue.media.length >= 5
               ? <VenueImgContainer className="carousel-item">
                   <img src={data.venue.media[4]} className="d-block w-100" alt="accommodation" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
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
           { data.venue 
               ? <>
                  <div className='col-9 col-sm-10'>
                    <div className='fs-5'>
                      Your booking to: 
                      <h1>{data.venue.name}</h1>
                    </div>
                  </div>
                  <div className='col-3 col-sm-2 text-end'>
                    <span className='fs-4'>{data.venue.maxGuests}</span>
                    <PersonIconStyle src={PersonIcon} alt='Person icon' />
                  </div>
                </>
               : ""
             }
            </div>
            { data && data.dateFrom && params && params.venue
               ? <EditBooking venue={params.venue} data={data} />
               : <Loader className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Loader>
             }
         </div>
       </div>
     </div>
 </main>;
  }

  export default BookingPage;