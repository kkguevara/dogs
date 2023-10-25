import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDog,
  ordenarNombre,
  ordenarPeso,
  filtrarPorTemperamentos,
  filtrarPorOrigen,
  getTemperaments,
} from "../../Redux/Action/action";
import style from "../../Styles/styles.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const handleOrdenNombre = (event) => {
    dispatch(ordenarNombre(event.target.value));
  };

  const handleOrdenPeso = (event) => {
    console.log(event.target.value);
    dispatch(ordenarPeso(event.target.value));
  };

  const handleFiltrarTemperamento = (event) => {
    const payload = event.target.value;
    if (payload === "All") {
      dispatch(getDog());
    } else {
      dispatch(filtrarPorTemperamentos(payload));
    }
  };

  const handleFiltrarOrigen = (event) => {
    const payload = event.target.value;
    if (payload === "All") {
      dispatch(getDog());
    } else {
      dispatch(filtrarPorOrigen(payload));
    }
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [getTemperaments]);

  const temperamentos = useSelector((state) => state.allTemperamentos);

  return (
    <div className={style.select_filters}>
      <select name="orderAZ" onChange={handleOrdenNombre}>
        <option value="">Ordenar por nombre</option>
        <option value="A">A-Z</option>
        <option value="Z">Z-A</option>
      </select>

      <select name="orderPeso" onChange={handleOrdenPeso}>
        <option value="">Ordenar por peso</option>
        <option value="Mayor">Mayor</option>
        <option value="Menor">Menor</option>
      </select>

      <select name="filterT" onChange={handleFiltrarTemperamento}>
        <option value="All">Filtrar por temperamento</option>
        {temperamentos.map((temp) => (
          <option key={temp.id} value={temp.nombre}>
            {temp.nombre}
          </option>
        ))}
      </select>

      <select
        className={style.select}
        name="filterO"
        onChange={handleFiltrarOrigen}
      >
        <option value="All">Filtrar por origen</option>
        <option value="db">Razas creadas</option>
        <option value="api">API</option>
      </select>
    </div>
  );
};

export default Filters;
