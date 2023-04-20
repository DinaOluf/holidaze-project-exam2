import { useEffect } from "react";

function BookedPage() {
  useEffect(() => {
    document.title = "Holidaze | Booking Successful"
 }, []);

    return <div>Booked Successfully</div>;
  }

  export default BookedPage;