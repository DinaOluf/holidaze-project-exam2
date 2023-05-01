import { useEffect } from "react";
import { useParams } from 'react-router-dom';

function ProfilePage() {
  let params = useParams();
  const userName = localStorage.getItem("Name");

  useEffect(() => {
      document.title = "Holidaze | Profile | "+params.name;
 }, [params]);


  return <main id="container p-5">
    <div className="d-flex justify-content-center mt-5">
      <div className='col-11 col-sm-9 col-xl-7 rounded-5 overflow-hidden p-4 bg-warning'>
        Profile
      </div>
    </div>
</main>;
}

  export default ProfilePage;