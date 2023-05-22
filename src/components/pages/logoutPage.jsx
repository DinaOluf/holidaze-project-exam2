import { Links } from "../styles/links.style";
import DocumentMeta from 'react-document-meta';

function LogoutPage() {

 const meta = {
  title: 'Holidaze | Logged out',
  description: 'Holidaze is an accommodation website where you can book venues for specific dates. View and book an amazing venue for your holiday today!',
  meta: {
      charset: 'utf-8',
      name: {
          keywords: 'holidaze, accommodation, venues, hotels, housing, react, rent, booking, vacation, holiday'
      }
    }
 }

    return (
    <>
      <DocumentMeta {...meta} />
      <main className="container d-flex flex-column justify-content-center align-items-center h-100">
        <h1>
          You have successfully been logged out!
        </h1>
        <Links className="fs-5" to="/">Back to front page</Links>
      </main>
    </>
    )
  }

  export default LogoutPage;