import { Hidden } from "../styles/hidden.styles";
import React, { useEffect } from 'react';
import Search from "../search";

function Home() {
    useEffect(() => {
        document.title = "Holidaze | Home"
     }, []);

    return (
        <main className="container d-flex flex-column p-5">
            <Hidden>
                <h1>
                    Front page
                </h1>
            </Hidden>
            <Search />
        </main>
    )
  }

  export default Home;