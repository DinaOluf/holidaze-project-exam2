import { useEffect } from "react";

function ProfilePage() {
  useEffect(() => {
    document.title = "Holidaze | Profile"
 }, []);

    return <div>Profile</div>;
  }

  export default ProfilePage;