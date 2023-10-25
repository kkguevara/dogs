import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogId } from "../../Redux/Action/action";
import style from "../../Styles/styles.module.css";
import Navbar from "../ComponentNavbar/Navbar";

const Details = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogId(id));
  }, [id]);

  const dog = useSelector((state) => state.dogId);
  const showContent = dog; // esto es para renderizar cuando dog tenga valor => true

  return (
    <>
      <Navbar />
      {showContent && (
        <div className={style.details}>
          <img alt="imagen" src={dog.imagen} />

          <h1 className={style.title_details}>{dog.nombre}</h1>
          <h2>ID: {id}</h2>
          <h2>Altura: {dog.altura}</h2>
          <h2>Peso: {dog.peso}</h2>
          <h2>Años de vida: {dog.anios}</h2>
          <h2>Temperamentos: {dog.temperamentos}</h2>
        </div>
      )}
    </>
  );
};

export default Details;
