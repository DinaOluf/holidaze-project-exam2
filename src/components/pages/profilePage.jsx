import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ProfileImgStyle } from "../styles/icons.styles";
import PlaceholderImage from "../../assets/images/profile-icon.png";
import useApi from "../useApi";
import { Loader } from "../styles/loader.styles";

function ProfilePage() {
  let params = useParams();
  // const userName = localStorage.getItem("Name");

  useEffect(() => {
      document.title = "Holidaze | Profile | "+params.name;
 }, [params]);

 const { data, isLoading, isError } = useApi(
    'https://api.noroff.dev/api/v1/holidaze/profiles/'+params.name+'?_bookings=true&_venues=true',
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
      </div>
    </div>
</main>;
}

  export default ProfilePage;