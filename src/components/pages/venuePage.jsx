import { useEffect } from "react";

function VenuePage() {
  useEffect(() => {
    document.title = "Holidaze | Venue"
 }, []);

    return <div>Venue</div>;
  }

  export default VenuePage;