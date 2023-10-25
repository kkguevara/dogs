import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostDog } from "../../Redux/Action/action";
import { getTemperaments } from "../../Redux/Action/action";
import "../../Styles/styles.module.css";
import Navbar from "../ComponentNavbar/Navbar";

const Create = () => {
  const dispatch = useDispatch();
  const allTemperamentos = useSelector((state) => state.allTemperamentos);

  const [state, setState] = useState({
    nombre: "",
    imagen: "",
    altura_min: "",
    altura_max: "",
    peso_min: "",
    peso_max: "",
    anios: 0,
    temperamentos: [],
  });

  const [errors, setErrors] = useState({
    nombre: "",
    imagen: "",
    altura_min: "",
    altura_max: "",
    peso_min: "",
    peso_max: "",
    anios: "",
    temperamentos: "",
  });
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const validate = (state, name) => {
    if (name === "nombre") {
      if (state.nombre === "")
        setErrors({ ...errors, nombre: "El nombre es requerido" });
      if (state.nombre.length < 3 || state.nombre.length > 10)
        setErrors({
          ...errors,
          nombre: "El nombre debe contener entre 3 y 10 caracteres",
        });
      else setErrors({ ...errors, nombre: "" });
    }
    if (name === "imagen") {
      if (state.imagen === "")
        setErrors({
          ...errors,
          imagen: "debe ingresar una url de imagen",
        });
      else setErrors({ ...errors, imagen: "" });
    }
    if (name === "altura_min") {
      if (state.altura_min === "")
        setErrors({
          ...errors,
          altura_min: "debe ingresar una altura mínima",
        });
      else setErrors({ ...errors, altura_min: "" });
    }
    if (name === "altura_max") {
      if (state.altura_max === "")
        setErrors({
          ...errors,
          altura_max: "debe ingresar una altura máxima",
        });
      else setErrors({ ...errors, altura_max: "" });
    }
    if (name === "peso_min") {
      if (state.peso_min === "")
        setErrors({
          ...errors,
          peso_min: "debe ingresar un peso mínimo",
        });
      else setErrors({ ...errors, peso_min: "" });
    }
    if (name === "peso_max") {
      if (state.peso_max === "")
        setErrors({
          ...errors,
          peso_max: "debe ingresar un peso máximo",
        });
      else setErrors({ ...errors, peso_max: "" });
    }
  };

  const handlerChange = (event) => {
    setSelection([...selection, event.target.value]);
    if (event.target.name === "temperamentos") {
      if (state.temperamentos.includes(event.target.value)) return;
      setState({
        ...state,
        [event.target.name]: [...state[event.target.name], event.target.value],
      });
      return;
    }
    if (event.target.name === "temperamento") {
      let value = document.getElementById(event.target.name).value;
      setState({
        ...state,
        [event.target.name]: [...state[event.target.name], value],
      });

      return;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    validate(
      {
        ...state,
        [event.target.name]: event.target.value,
      },
      event.target.name
    );
  };

  const disabledButton = () => {
    let disabled = true;
    for (let error in errors) {
      if (errors[error] !== "") return true;
      disabled = false;
    }
    return disabled;
  };

  const remove = (event) => {
    setState({
      ...state,
      [event.target.name]: [
        ...state[event.target.name].filter((x) => x !== event.target.id),
      ],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(PostDog(state));
  };

  return (
    <div>
      <Navbar />
      <br />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handlerChange}
          type="text"
          name="nombre"
          placeholder="Nombre"
        />
        <span>{errors.nombre}</span>

        <input
          onChange={handlerChange}
          type="text"
          name="imagen"
          placeholder="Imagen"
        />
        <span>{errors.imagen}</span>

        <input
          onChange={handlerChange}
          type="number"
          name="altura_min"
          placeholder="Altura mínima"
        />
        <span>{errors.altura_min}</span>

        <input
          onChange={handlerChange}
          type="number"
          name="altura_max"
          placeholder="Altura máxima"
        />
        <span>{errors.altura_max}</span>

        <input
          onChange={handlerChange}
          type="number"
          name="peso_min"
          placeholder="Peso mínimo"
        />
        <span>{errors.peso_min}</span>

        <input
          onChange={handlerChange}
          type="number"
          name="peso_max"
          placeholder="Peso máximo"
        />
        <span>{errors.peso_max}</span>

        <input
          onChange={handlerChange}
          type="number"
          name="anios"
          placeholder="Años"
        />

        <select
          onChange={handlerChange}
          name="temperamentos"
          id="temperamentos"
        >
          <option value="" disabled selected hidden>
            Selecciona un(os) temperamento(s)
          </option>
          {allTemperamentos.map((t) => {
            return (
              <option key={t.id} value={t.nombre}>
                {t.nombre}
              </option>
            );
          })}
        </select>

        {state.temperamentos.map((t) => (
          <div>
            <span id={"temperamentos"}>{t}</span>
            <button
              type="button"
              className="button-remove"
              id={t}
              name="temperamentos"
              onClick={remove}
            >
              Eliminar
            </button>
          </div>
        ))}

        <input disabled={disabledButton()} type="submit" />
      </form>
    </div>
  );
};
export default Create;
