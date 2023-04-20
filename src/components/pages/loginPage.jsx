import { useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    document.title = "Holidaze | Log in"
 }, []);
 
    return <div>Log in</div>;
  }

  export default LoginPage;