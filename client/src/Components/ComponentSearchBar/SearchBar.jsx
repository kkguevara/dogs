import React from "react";

import { useState } from "react";
import style from "../../Styles/styles.module.css";
import { useDispatch } from "react-redux";
import { byName } from "../../Redux/Action/action";

export default function SearchBar({ setCurrentPage }) {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleChange = (evento) => {
    if (/^[a-zA-Z\s]*$/.test(evento.target.value)) {
      setSearch(evento.target.value.trim());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    dispatch(byName(search));
  };

  return (
    <div className={style.search_bar}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Buscar por nombre"
      />
      <button className={style.search_bar} onClick={handleSubmit}>
        Buscar
      </button>
    </div>
  );
}
