import React from "react";
import "../../Styles/styles.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Welcome</Link>
      <Link to="/home">Home</Link>
      <Link to="/create">Formulario</Link>
    </div>
  );
};

export default Navbar;
