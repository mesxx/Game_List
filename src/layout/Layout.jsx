import React from "react";
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
