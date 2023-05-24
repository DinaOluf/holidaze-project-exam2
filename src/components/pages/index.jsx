import { Hidden } from "../styles/hidden.styles";
import React from "react";
import Search from "../search";
import DocumentMeta from "react-document-meta";

function Home() {
  const meta = {
    title: "Holidaze | Home",
    description:
      "Holidaze is an accommodation website where you can book venues for specific dates. View and book an amazing venue for your holiday today!",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "holidaze, accommodation, venues, hotels, housing, react, rent, booking, vacation, holiday",
      },
    },
  };

  return (
    <>
      <DocumentMeta {...meta} />
      <main className="container d-flex flex-column p-5">
        <Hidden>
          <h1>Front page</h1>
        </Hidden>
        <Search />
      </main>
    </>
  );
}

export default Home;
