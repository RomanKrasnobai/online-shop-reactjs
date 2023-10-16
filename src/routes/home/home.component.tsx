import {Category} from "../../interfaces/category.interface";
import Directory from "../../components/directory/directory.component";
import React from "react";
import {Outlet} from "react-router-dom";

const Home = () => {

  return (
    <>
      <Directory />
      <Outlet />
    </>
  );
}

export default Home;
