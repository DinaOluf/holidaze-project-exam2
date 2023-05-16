import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ProfileImgStyle, EditIconStyle } from "../styles/icons.styles";
import PlaceholderImage from "../../assets/images/profile-icon.png";
import useApi from "../functions/useApi";
import { Loader } from "../styles/loader.styles";
import { VenueCard } from "../styles/venueCard.styles";
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";
import PlaceholderImg from "../../assets/images/placeholder-image.png";
import editIcon from "../../assets/images/options-icon.png";
import { PersonIconStyle } from '../styles/venue.styling';
import { ButtonSmaller, ButtonSmaller2 } from '../styles/buttons.styles';
import { ContainerCard } from "../styles/containerCard.styles";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Error, Input } from "../styles/form.styles";
import { Links } from "../styles/links.style";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    avatar: yup
      .string()
      .required('Please paste your direct image link')
      .matches(/(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg))/, "Please paste your direct image link (ends with .jpg/.jpeg/.gif/.png/.svg)")
  })
  .required();

function ProfilePage() {
  let params = useParams();
  const userName = localStorage.getItem("Name");
  const [ imgUrl, setImgUrl] = useState(PlaceholderImage);

  useEffect(() => {
      document.title = "Holidaze | Profile | "+params.name;
 }, [params]);

 const cut20 = (line) => {
  return line.slice(0, 20) + "...";
}

function setNewImage(value) {
  if(value.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)) {
    setImgUrl(value);
  }
}

const { register, handleSubmit, formState: { errors }, reset } = useForm({
  resolver: yupResolver(schema),
});


 const { data, isLoading, isError } = useApi(
    'https://api.noroff.dev/api/v1/holidaze/profiles/'+params.name+'?_bookings=true&_venues=true',
    'GET'
  );

  useEffect(() => {
    setImgUrl(data.avatar);
}, [data.avatar]);

  const onSaveImgHandler = async (e) => {
    const url = `https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/media`;
    const token = localStorage.getItem("Token");
   
    let newData = {
      avatar: e.avatar
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
      if ( json.name ) {
        window.location.reload(); 
      } else {
        console.log("Some error occured");
      }
   
    } catch (error) {
      console.log(error);
    }
    reset();
   };

  const onClickConfirm = async (e) => {
    confirmAlert({
      title: 'Cancel booking',
      message: 'Are you sure you want to cancel your order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDeleteHandler(e)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const onDeleteHandler = async (id) => {
    const url = "https://api.noroff.dev/api/v1/holidaze/bookings/"+id;
    const token = localStorage.getItem("Token");
  
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
    };
  
    try {
      await fetch(url, options);
      window.location.reload();
  
    } catch (error) {
      console.log(error);
    }
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
    <div className="d-flex flex-column align-items-center mt-5">
      <ContainerCard className='col-11 col-sm-9 col-xl-7 rounded-5'>
        <div className="d-flex align-items-center">
          <div className=" position-relative">
            <ProfileImgStyle className="me-2">
            { data.avatar && data.avatar
              ? <img src={data.avatar} alt="Personal profile" />
              : <img src={PlaceholderImage} alt="Personal profile" />
            }
            </ProfileImgStyle>
          { userName === params.name 
            ? <>
              <EditIconStyle src={editIcon} id="editIcon" className="position-absolute bottom-0 start-0" alt="edit profile-icon" data-bs-toggle="modal" data-bs-target="#imgModal"/>
                <div className="modal fade" id="imgModal" tabIndex="-1" aria-labelledby="imgModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-3" id="imgModalLabel">Edit Profile Image</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body row gap-1 align-items-center p-4">
                        <ProfileImgStyle className="p-0">
                          <img src={imgUrl} alt="Personal profile" />
                        </ProfileImgStyle>
                        <div className="col">
                          <label className="fs-5" htmlFor='editImg'>Direct Image Link (generate on <Links target="_blank" to="https://postimages.org/">postimages.org</Links>)</label>
                          <Input id="editImg" className="w-100" {...register("avatar")} onChange={(e) => setNewImage(e.target.value)} title="Direct Link to an Image (e.g. link ending with .jpg)"></Input>
                          <Error>{errors.avatar?.message}</Error>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <ButtonSmaller2 className="btn btn-secondary" data-bs-dismiss="modal">Close</ButtonSmaller2>
                        <ButtonSmaller onClick={handleSubmit(onSaveImgHandler)} className="btn btn-primary">Save</ButtonSmaller>
                      </div>
                    </div>
                  </div>
                </div>
            </>
            : ""}
          </div>
          <div>
            <h1 className="mb-0">{data.name}</h1>
            <div>{data.email}</div>
          </div>
        </div>
        {data.bookings && data.bookings.length !== 0
        ? <>
          <hr />
          <h2 className="mt-5">Upcoming Bookings</h2>
          {data.bookings.map((data) => (
            <div key={data.id}>
              { data.dateTo >= new Date().toISOString()
                    ? <div className="d-flex flex-wrap mb-5">
                    <VenueCard className="position-relative" title="Takes you to the venue page" to={`/venue/${data.venue.id}`}>
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
                            { data.venue.meta.pets 
                                ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                                : "" }
                        </div>
                    </div>
                </VenueCard>
                { data.dateFrom >= new Date().toISOString()
                  ? <>
                      <div className='d-flex flex-column justify-content-between flex-wrap ms-2'>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`dateArrival-${data.id}`}>Date of arrival</label>
                          <div id={`dateArrival-${data.id}`}>{data.dateFrom.slice(0, 10)}</div>
                        </div>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`dateDeparture-${data.id}`}>Date of departure</label>
                          <div id={`dateDeparture-${data.id}`}>{data.dateTo.slice(0, 10)}</div>
                        </div>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`numberGuests-${data.id}`}>Guest(s)</label>
                          <div className='d-flex'>
                            <div id={`numberGuests-${data.id}`} className='text-end'>{data.guests}</div>
                            <PersonIconStyle src={PersonIcon} alt='Person icon' />
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          <ButtonSmaller2 onClick={() => onClickConfirm(data.id)}>Cancel</ButtonSmaller2>
                          <ButtonSmaller title="Edit this booking" to={`/booking/${data.id}`}>Edit</ButtonSmaller>
                        </div>
                      </div>
                    </>
                  : <>
                      <div className='d-flex flex-column justify-content-between flex-wrap ms-2'>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`dateArrival-${data.id}`}>Date of arrival</label>
                          <div id={`dateArrival-${data.id}`}>{data.dateFrom.slice(0, 10)}</div>
                        </div>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`dateDeparture-${data.id}`}>Date of departure</label>
                          <div id={`dateDeparture-${data.id}`}>{data.dateTo.slice(0, 10)}</div>
                        </div>
                        <div className='d-flex flex-column fs-5'>
                          <label htmlFor={`numberGuests-${data.id}`}>Guest(s)</label>
                          <div className='d-flex'>
                            <div id={`numberGuests-${data.id}`} className='text-end'>{data.guests}</div>
                            <PersonIconStyle src={PersonIcon} alt='Person icon' />
                          </div>
                        </div>
                        <div className="d-flex mb-3 flex-wrap gap-2">
                          <Error title="If your booking is in less than 24 hours you cannot change your booking.">Unable to edit due to 24hr restriction.</Error>
                        </div>
                      </div>
                    </>
                }
              </div>
              : ""
            }
            </div>
          ))}
        </>
        : ""
        }
        {data.bookings && data.bookings.length !== 0
        ? <>
        <h2 className="mt-5">Old Bookings</h2>
        {data.bookings.map((data) => (
          <div key={data.id}>
            { data.dateTo < new Date().toISOString()
                  ? <div className="d-flex flex-wrap mb-5">
                  <VenueCard className="position-relative" title="Takes you to the venue page" to={`/venue/${data.venue.id}`}>
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
                          { data.venue.meta.pets 
                              ? <img src={PetsIcon} className="card-icons" alt="pets icon"/>
                              : "" }
                      </div>
                  </div>
              </VenueCard>
              <div className='d-flex flex-column justify-content-between flex-wrap ms-2'>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor={`dateArrival-${data.id}`}>Date of arrival</label>
                  <div id={`dateArrival-${data.id}`}>{data.dateFrom.slice(0, 10)}</div>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor={`dateDeparture-${data.id}`}>Date of departure</label>
                  <div id={`dateDeparture-${data.id}`}>{data.dateTo.slice(0, 10)}</div>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor={`numberGuests-${data.id}`}>Guest(s)</label>
                  <div className='d-flex'>
                    <div id={`numberGuests-${data.id}`} className='text-end'>{data.guests}</div>
                    <PersonIconStyle src={PersonIcon} alt='Person icon' />
                  </div>
                </div>
                <div className="d-flex mb-3 flex-wrap gap-2">
                  <Error title="If your booking is in less than 24 hours you cannot change your booking.">This booking is archived.</Error>
                </div>
              </div>
            </div>
            : ""
          }
          </div>
        ))}
        </>
        : ""}
      </ContainerCard>
      {data.venueManager && data.venues.length !== 0
      ? <div className='col-11 col-sm-9 col-xl-7 mt-4 px-3'>
          <h2>{data.name}'s Venues</h2>
          <div className="d-flex justify-content-evenly gap-4 mt-4 flex-wrap">
                {data.venues.map((data) => (
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
        </div>
      : ""
      }
    </div>
</main>;
}

export default ProfilePage;