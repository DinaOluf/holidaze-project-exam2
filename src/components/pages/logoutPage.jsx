import { useEffect } from "react";
import { Links } from "../styles/links.style";

function LogoutPage() {
  useEffect(() => {
    document.title = "Holidaze | Logged out successfully"
 }, []);

    return <main className="container d-flex flex-column justify-content-center align-items-center h-100">
      <h1>
        You have successfully been logged out!
      </h1>
      <Links className="fs-5" to="/">Back to front page</Links>
  </main>;
  }

  export default LogoutPage;