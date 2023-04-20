import { useEffect } from "react";

function RouteNotFound() {
  useEffect(() => {
    document.title = "Holidaze | Page not found"
 }, []);

    return <div>Page not found</div>;
  }

  export default RouteNotFound;