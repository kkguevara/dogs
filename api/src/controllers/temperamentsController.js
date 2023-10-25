const { Temperaments } = require("../db");
const axios = require("axios");

// variables de entorno
const { API_KEY, API_URL } = process.env;

const getTemperaments = async () => {
  console.log(API_URL);
  const { data } = await axios(`${API_URL}/v1/breeds?api_key=${API_KEY}`);

  let temperaments = [];

  //buscando los temperamentos en cada perro
  data.map((temp) => {
    if (temp.temperament) {
      // si existe
      // separar string por comas ,
      const t = temp.temperament.split(", ");
      // recorrer el array separado e insertar en el array temperaments
      t.map((row) => temperaments.push(row));
    }
  });

  // eliminar los repetidos
  temperaments = [...new Set(temperaments)];

  // guardar en base de datos el array temperaments
  for (const temperament of temperaments) {
    await Temperaments.findOrCreate({
      where: { nombre: temperament },
    });
  }

  // devolver los temperamentos de la base de datos
  const temperamentsDB = Temperaments.findAll();

  return temperamentsDB;
};

module.exports = {
  getTemperaments,
};
