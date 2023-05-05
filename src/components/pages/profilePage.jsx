import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
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
import editIcon from "../../assets/images/options-icon.png";
import { PersonIconStyle } from '../styles/venue.styling';
import { ButtonSmaller, ButtonSmaller2 } from '../styles/buttons.styles';
import { ContainerCard } from "../styles/containerCard.styles";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Error, Input } from "../styles/form.styles";
import { Links } from "../styles/links.style";

function ProfilePage() {
  let params = useParams();
  // const navigate = useNavigate();
  const userName = localStorage.getItem("Name");
  // const date = new Date().toISOString().slice(0, 10);
  const [ imgUrl, setImgUrl] = useState(PlaceholderImage);

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

  const onClickConfirm = async (e) => {
    confirmAlert({
      title: 'Cancel booking',
      message: 'Are you sure you want to cancel your order?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onSubmitHandler(e)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const onSubmitHandler = async (id) => {
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
    <div className="d-flex justify-content-center mt-5">
      <ContainerCard className='col-11 col-sm-9 col-xl-7 rounded-5'>
        <div className="d-flex align-items-center">
          <div className=" position-relative">
            <ProfileImgStyle className="me-2">
              <img src={PlaceholderImage} alt="Personal profile" />
            </ProfileImgStyle>
          { userName === params.name 
            ? <>
              <img src={editIcon} id="editIcon" height="28px" width="28px" className="position-absolute bottom-0 start-0" alt="edit profile-icon" data-bs-toggle="modal" data-bs-target="#imgModal"/>
                <div class="modal fade" id="imgModal" tabindex="-1" aria-labelledby="imgModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-3" id="imgModalLabel">Edit Profile Image</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body row gap-1 align-items-center p-4">
                        <ProfileImgStyle className="p-0">
                          <img src={imgUrl} alt="Personal profile" />
                        </ProfileImgStyle>
                        <div className="col">
                          <label className="fs-5" htmlFor='editImg'>Direct Image Link (generate on <Links to="https://postimages.org/">postimages.org</Links>)</label>
                          <Input id="editImg" className="w-100" type="url" pattern=".*\.(jpg|jpeg|png|svg)$" title="Direct Link to an Image (e.g. link ending with .jpg)"></Input>
                          {/* <Error>{errorMessage}</Error> */}
                        </div>
                      </div>
                      <div class="modal-footer">
                        <ButtonSmaller2 type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</ButtonSmaller2>
                        <ButtonSmaller type="button" class="btn btn-primary">Save</ButtonSmaller>
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
        <hr />
        <h2 className="mt-5">Upcoming Bookings</h2>
        {data.bookings
        ? data.bookings.map((data) => (
          <div key={data.venue.id}>
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
                          { data.venue.meta.parking 
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
        ))
        : ""}
        <h2 className="mt-5">Old Bookings</h2>
        {data.bookings
        ? data.bookings.map((data) => (
          <div key={data.venue.id}>
            { data.dateTo < new Date().toISOString()
                  ? <div className="d-flex flex-wrap">
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
                          { data.venue.meta.parking 
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
        ))
        : ""}
      </ContainerCard>
    </div>
</main>;
}

export default ProfilePage;