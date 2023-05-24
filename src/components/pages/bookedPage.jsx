import { Links } from "../styles/links.style";
import DocumentMeta from "react-document-meta";

function BookedPage() {
  const name = localStorage.getItem("Name");

  const meta = {
    title: "Holidaze | Booking Successful",
    description:
      "Holidaze is an accommodation website where you can book venues for specific dates. View and book an amazing venue for your holiday today!",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "holidaze, accommodation, venues, hotels, housing, react, rent, booking, vacation, holiday",
      },
    },
  };

  return (
    <>
      <DocumentMeta {...meta} />
      <main className="container d-flex flex-column justify-content-center align-items-center h-100">
        <h1>Your booking was successful!</h1>
        <p className="fs-5">
          You can view, edit and cancel your booking on your{" "}
          <Links to={`/profile/${name}`}>Profile</Links>.
        </p>
        <Links className="fs-5" to="/">
          Back to front page
        </Links>
      </main>
      ;
    </>
  );
}

export default BookedPage;
