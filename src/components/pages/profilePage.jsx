import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ProfileImgStyle } from "../styles/icons.styles";
import PlaceholderImage from "../../assets/images/profile-icon.png";
import useApi from "../useApi";
import { Loader } from "../styles/loader.styles";
import { VenueCard } from "../styles/venueCard.styles";
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";
import PlaceholderImg from "../../assets/images/placeholder-image.png";
import { DateInput, InputGuests } from '../styles/venue.styling';
import { Button, Button2 } from '../styles/buttons.styles';
// import { formatDate } from '../timeDate';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Error } from '../styles/form.styles';

const schema = yup
  .object({
    dateArrival: yup
      .string()
      .required('Please choose a date'),
    dateDeparture: yup
      .string()
      .required('Please choose a date'),
    numberGuests: yup
      .number("Please write a number")
      .required('Please choose a date')
      .min(1, "Must be at least one guest")
  })
  .required();

function ProfilePage() {
  let params = useParams();
  const navigate = useNavigate();
  // const userName = localStorage.getItem("Name");
  const date = new Date().toISOString().slice(0, 10);
  const [ arrivalDate, setArrivalDate] = useState(date);

  useEffect(() => {
      document.title = "Holidaze | Profile | "+params.name;
 }, [params]);

 const cut20 = (line) => {
  return line.slice(0, 20) + "...";
}

 const { data, isLoading, isError } = useApi(
    'https://api.noroff.dev/api/v1/holidaze/profiles/'+params.name+'?_bookings=true&_venues=true',
    'GET'
  );

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (e) => {
    const url = "https://api.noroff.dev/api/v1/holidaze/bookings"
    const token = localStorage.getItem("Token");
  
    let newData = {
      dateFrom: e.dateArrival,
      dateTo: e.dateDeparture,
      guests: e.numberGuests,
      venueId: data.id,
    };
  
    const options = {
        // method: "POST", PUT and DELETE depending on button
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
    <div className="d-flex justify-content-center mt-5">
      <div className='col-11 col-sm-9 col-xl-7 rounded-5 overflow-hidden p-4 bg-warning'>
        <div className="d-flex align-items-center">
          <ProfileImgStyle className="me-2">
            <img src={PlaceholderImage} alt="Personal profile" />
          </ProfileImgStyle>
          <div>
            <h1 className="mb-0">{data.name}</h1>
            <div>{data.email}</div>
          </div>
        </div>
        <hr />
        <h2>Your Bookings</h2>
        {data.bookings
        ? data.bookings.map((data) => (
          <div className="d-flex" key={data.venue.id}>
            <VenueCard className="position-relative" to={`/venue/${data.venue.id}`}>
                <div className="card-img-wrap">
                    { data.venue.media.length === 0 
                        ?  <img src={PlaceholderImg} className="venue-images" alt="Venue" />
                        :  <img src={data.venue.media[0]} className="venue-images" alt="Venue" onError={(e)=>{ if (e.target.src !== PlaceholderImg) 
                        { e.target.onerror = null; e.target.src=PlaceholderImg; } }} /> 
                    }
                </div>
                <div className="p-2 h-50">
                    { data.venue.name.length >= 20 
                        ? <h2 className="m-0 fs-4">{cut20(data.venue.name)}</h2>
                        : <h2 className="m-0 fs-4">{data.venue.name}</h2>
                    }
                    <div className="d-flex justify-content-between mb-3">
                        <div>{data.venue.price},-</div>
                        <div className="d-flex align-items-center">
                            <div>{data.venue.maxGuests}</div>
                            <img src={PersonIcon} className="person-icon mt-1" alt="person icon" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end my-1 gap-1">
                        { data.venue.meta.wifi 
                            ? <img src={WifiIcon} className="card-icons" alt="wifi icon"/> 
                            : "" }
                        { data.venue.meta.parking 
                            ? <img src={ParkingIcon} className="card-icons" alt="parking icon"/> 
                            : "" }
                        { data.venue.meta.breakfast 
                            ? <img src={FoodIcon} className="card-icons" alt="breakfast icon"/> 
                            : "" }
                        { data.venue.meta.parking 
                            ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                            : "" }
                    </div>
                </div>
            </VenueCard>
            <div>
              <form className='d-flex flex-column justify-content-between flex-wrap ms-2' onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='dateArrival'>Date of arrival</label>
                  <DateInput id='dateArrival' {...register("dateArrival")} onChange={e => setArrivalDate(e.target.value)} type='date' min={date}></DateInput>
                  <Error>{errors.dateArrival?.message}</Error>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='dateDeparture'>Date of departure</label>
                  <DateInput id='dateDeparture' {...register("dateDeparture")} type='date' min={arrivalDate}></DateInput>
                  <Error>{errors.dateDeparture?.message}</Error>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor='numberGuests'>Guest(s)</label>
                  <InputGuests className='d-flex'>
                    <input id='numberGuests' {...register("numberGuests")} className='text-end' type='number' onChange={e => (e.target.value = e.value)} value={data.guests}></input>
                    <img src={PersonIcon} alt='Person icon' />
                  </InputGuests>
                  <Error>{errors.numberGuests?.message}</Error>
                </div>
                <Button2>Delete</Button2>
                <Button>Book</Button>
              </form>
            </div>
          </div>
        ))
        : ""}
      </div>
    </div>
</main>;
}

  export default ProfilePage;