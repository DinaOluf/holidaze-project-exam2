import { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    document.title = "Holidaze | Logged out successfully"
 }, []);

    return <div>Successfully logged out</div>;
  }

  export default LogoutPage;