// import { useParams } from 'react-router-dom';
import { useEffect } from "react";

function VenuePage() {
  // let params = useParams();

  useEffect(() => {
    document.title = "Holidaze | Venue"; //make it show title after fetched from API
 }, []);

    return <div>Venue</div>;
  }

  export default VenuePage;