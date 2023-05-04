import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import useApi from '../useApi';
import { Loader } from '../styles/loader.styles';
import PlaceholderImg from '../../assets/images/placeholder-image.png';
import PersonIcon from "../../assets/images/person-icon.png";
import { DateInput, InputGuests, PersonIconStyle, VenueImgContainer } from '../styles/venue.styling';
import { ButtonSmaller, ButtonSmaller2 } from '../styles/buttons.styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Error } from '../styles/form.styles';
import { confirmAlert } from 'react-confirm-alert';

const schema = yup
  .object({
    dateArrival: yup
      .string()
      .required('Please choose a date'),
    dateDeparture: yup
      .string()
      .required('Please choose a date'),
    numberGuests: yup
      .number()
      .required('Please choose the number of guests')
  })
  .required();


function BookingPage() {
 let params = useParams();
 const navigate = useNavigate();
 const date = new Date().toISOString().slice(0, 10);
 const [ arrivalDate, setArrivalDate] = useState(date);
 const name = localStorage.getItem("Name");


 const { data, isLoading, isError } = useApi(
   'https://api.noroff.dev/api/v1/holidaze/bookings/'+params.id+'?_venue=true&_customer=true',
   'GET'
 );

 useEffect(() => {
    document.title = `Holidaze | Booking | ${data.name}`; 
    if(data.dateFrom) {
      setArrivalDate(data.dateFrom.slice(0, 10));
    } 
}, [data]);

const { register, handleSubmit, formState: { errors }, reset } = useForm({
 resolver: yupResolver(schema),
});

const onCancelConfirm = async (e) => {
  confirmAlert({
    title: 'Cancel booking',
    message: 'Are you sure you want to cancel your order?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => onCancelHandler(e)
      },
      {
        label: 'No',
      }
    ]
  });
}

const onCancelHandler = async (e) => {
  const url = "https://api.noroff.dev/api/v1/holidaze/bookings/"+params.id;
  const token = localStorage.getItem("Token");
 
  const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
  };
 
  try {
    await fetch(url, options);
    navigate(`/Profile/${name}`);
 
  } catch (error) {
    console.log(error);
  }
 
  reset();
 };

const onEditHandler = async (e) => {
 const url = "https://api.noroff.dev/api/v1/holidaze/bookings/"+params.id;
 const token = localStorage.getItem("Token");

 let newData = {
   dateFrom: e.dateArrival,
   dateTo: e.dateDeparture,
   guests: e.numberGuests
 };

 const options = {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
     },
     body: JSON.stringify(newData),
 };

 try {
   const response = await fetch(url, options);
   const json = await response.json();
   console.log(json); //remove
   if ( json.id ) {
     navigate("/booked-success");
   } else {
     console.log("Some error occured");
   }

 } catch (error) {
   console.log(error);
 }

 reset();
};
 
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
               : <VenueImgContainer className="carousel-item">
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
            { data.dateFrom
               ? <div className='d-flex justify-content-center my-5 w-100'>
                  <form className='d-flex flex-column justify-content-between flex-wrap ms-2' >
                      <div className='d-flex flex-column fs-5'>
                        <label htmlFor="dateArrival">Date of arrival</label>
                        <DateInput id="dateArrival" type='date' min={date} {...register("dateArrival")} onChange={(e) => setArrivalDate(e.target.value)} defaultValue={data.dateFrom.slice(0, 10)}></DateInput>
                        <Error>{errors.dateArrival?.message}</Error>
                      </div>
                      <div className='d-flex flex-column fs-5'>
                        <label htmlFor="dateDeparture">Date of departure</label>
                        <DateInput id="dateDeparture" type='date' min={arrivalDate}{...register("dateDeparture")} defaultValue={data.dateTo.slice(0, 10)}></DateInput>
                        <Error>{errors.dateDeparture?.message}</Error>
                      </div>
                      <div className='d-flex flex-column fs-5'>
                        <label htmlFor="numberGuests">Guest(s)</label>
                        <InputGuests className='d-flex'>
                          <input id="numberGuests" className='text-end' type='number' min={1} {...register("numberGuests")} defaultValue={data.guests}></input>
                          <PersonIconStyle src={PersonIcon} alt='Person icon' />
                        </InputGuests>
                        <Error>{errors.numberGuests?.message}</Error>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <ButtonSmaller2 onClick={(e) => {onCancelConfirm(e)}}>Cancel</ButtonSmaller2>
                        <ButtonSmaller onClick={handleSubmit(onEditHandler)}>Edit</ButtonSmaller>
                      </div>
                    </form>
                  </div>
               : ""
             }
         </div>
       </div>
     </div>
 </main>;
  }

  export default BookingPage;