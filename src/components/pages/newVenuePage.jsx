import { Button } from "../styles/buttons.styles";
import { useEffect } from "react";

function NewVenuePage() {
  useEffect(() => {
    document.title = "Holidaze | New Venue"
 }, []);

    return <main id="container p-5">
        <div className="d-flex justify-content-center mt-4">
          <div className='col-11 col-sm-9 col-xl-7 rounded-5 bg-light overflow-hidden p-4'>
            <h1>Create a new venue</h1>
            <form>
                <div className="row flex-wrap">
                  <div className="col">
                    <div>Title</div>
                    <div>Guests + Price</div>
                  </div>
                  <div className="col">
                    <div>Direct Img Url</div>
                    <div>Select</div>
                  </div>
                </div>
                <div>
                  Textarea
                </div>
                <div className="d-flex justify-content-center">
                  <Button>Post Venue</Button>
                </div>
            </form>
          </div>
        </div>
    </main>;
  }

  export default NewVenuePage;