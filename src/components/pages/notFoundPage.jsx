import { useEffect } from "react";
import { Links } from "../styles/links.style";

function RouteNotFound() {
  useEffect(() => {
    document.title = "Holidaze | Page not found"
 }, []);

    return <main className="container d-flex flex-column justify-content-center align-items-center h-100">
      <div className="fs-4">Page not found</div>
      <Links className="fs-5" to='/'>Back to front page</Links>
  </main>;
  }

  export default RouteNotFound;