import React from "react";
import style from "../../Styles/styles.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, imagen, nombre, peso, temperamentos }) => {
  return (
    <div className={style.card}>
      <img src={imagen} alt="" />

      <Link to={`/details/${id}`} className={style.link_style}>
        <h1> Nombre: {nombre} </h1>
      </Link>
      <h2> Peso: {peso} </h2>
      <h2> Temperamentos: {temperamentos} </h2>
    </div>
  );
};

export default Card;
