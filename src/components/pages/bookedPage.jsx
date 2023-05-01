import { useEffect } from "react";
import { Links } from "../styles/links.style";

function BookedPage() {
  const name = localStorage.getItem("Name");

  useEffect(() => {
    document.title = "Holidaze | Booking Successful"
 }, []);

    return <main className="container d-flex flex-column justify-content-center align-items-center h-100">
    <h1>
      Your booking was successful!
    </h1>
    <p className="fs-5">You can view, edit and cancel your booking on your <Links to={`/profile/${name}`}>Profile</Links>.</p>
    <Links className="fs-5" to="/">Back to front page</Links>
</main>;
  }

  export default BookedPage;