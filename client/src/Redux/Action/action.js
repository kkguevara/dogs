import axios from "axios";
import {
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENTS,
  GET_DOGS,
  GET_DOGS_ID,
  GET_TEMPERAMENTS,
  ORDER_NAME,
  ORDER_WEIGHT,
} from "./action-types";

export const PostDog = (state) => {
  return async function () {
    try {
      const body = {
        ...state,
        altura: `${state.altura_min} - ${state.altura_max}`,
        peso: `${state.peso_min} - ${state.peso_max}`,
      };

      const result = await axios.post(`http://localhost:3001/dogs`, body);

      if (result.status === 201) {
        alert("El perro fue creado con éxito");
        window.location.href = "/home";
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const getDog = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/dogs`);
      dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDogId = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
      console.log("sdasda", data);
      dispatch({ type: GET_DOGS_ID, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/temperaments`);
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const byName = (nombre) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/dogs?name=${nombre}`
      );

      dispatch({
        type: GET_DOGS,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const ordenarNombre = (opcion) => {
  return {
    type: ORDER_NAME,
    payload: opcion,
  };
};

export const ordenarPeso = (opcion) => {
  return {
    type: ORDER_WEIGHT,
    payload: opcion,
  };
};

export const filtrarPorTemperamentos = (temperamento) => {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: temperamento,
  };
};

export const filtrarPorOrigen = (origen) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origen,
  };
};
