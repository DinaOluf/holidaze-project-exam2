import "./App.css";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Background from "./components/background";
import { HeaderBar } from "./components/styles/header.styles";
import { FooterBar } from "./components/styles/footer.styles";
import Nav from "./components/nav";
import Home from "./components/pages";
import LoginPage from "./components/pages/loginPage";
import RegisterPage from "./components/pages/registerPage";
import ProfilePage from "./components/pages/profilePage";
import VenuePage from "./components/pages/venuePage";
import NewVenuePage from "./components/pages/newVenuePage";
import BookedPage from "./components/pages/bookedPage";
import LogoutPage from "./components/pages/logoutPage";
import RouteNotFound from "./components/pages/notFoundPage";
import BookingPage from "./components/pages/bookingPage";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min";

function Header() {
  return (
    <HeaderBar>
      <Nav />
    </HeaderBar>
  );
}

function Footer() {
  return <FooterBar>© Dina Olufsen 2023</FooterBar>;
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Background />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile/:name" element={<ProfilePage />} />
          <Route path="booking/:id/:venue" element={<BookingPage />} />
          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="new-venue" element={<NewVenuePage />} />
          <Route path="booked-success" element={<BookedPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
