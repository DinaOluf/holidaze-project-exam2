import './App.css';
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

function Header() {
  // return (
  //   <header>
  //     <Nav />
  //   </header>
  // );
}

function Footer() {
  // return <footer>© Dina Olufsen 2023</footer>;
}

function Layout() {
  return (
    <>
      {/* <Header />
        <Outlet />
      <Footer /> */}
    </>
  );
}

function App() {
  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes> */}
    </>
  );
}

export default App;
