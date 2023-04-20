import { useEffect } from "react";

function NewVenuePage() {
  useEffect(() => {
    document.title = "Holidaze | New Venue"
 }, []);

    return <div>Create new venue</div>;
  }

  export default NewVenuePage;