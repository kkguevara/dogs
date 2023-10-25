const { Dog, Temperaments, DogTemperaments } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

// VARIABLE DE ENTORNO
const { API_KEY, API_URL } = process.env;

const createDog = async (
  imagen,
  nombre,
  altura,
  peso,
  anios,
  temperamentos
) => {
  const newDog = await Dog.create({
    imagen,
    nombre,
    altura,
    peso,
    anios,
  });

  temperamentos.map(async (item) => {
    const [temperamento, created] = await Temperaments.findOrCreate({
      where: { nombre: item },
    });

    await DogTemperaments.create({
      id_dog: newDog.id,
      id_temperament: temperamento.id,
    });
  });

  return newDog;
};

const getDog = async () => {
  let dogs = [];

  const dogBD = await Dog.findAll({
    include: [
      {
        model: Temperaments,
        attributes: ["nombre"],
      },
    ],
  });

  dogBD.map((dog) => {
    const { id, imagen, nombre, altura, peso, anios } = dog;
    const temperaments = dog.temperaments.map((t) => t.nombre).join(", ");

    const d = {
      id,
      imagen,
      nombre,
      altura,
      peso,
      anios,
      temperamentos: temperaments,
      origen: "db",
    };

    dogs.push(d);
  });

  const { data } = await axios(`${API_URL}/v1/breeds?api_key=${API_KEY}`);

  data.map((dog) => dogs.push(mapeardog(dog)));

  return dogs;
};

//por id
const getDogId = async (id) => {
  let dogFound = null;
  let dog = null;

  const idDog = Number(id);

  if (isNaN(idDog)) {
    //verifica el tipo de dato id si es numero buscar en la api sino busca en bd
    dogFound = await Dog.findByPk(id, {
      include: [
        {
          model: Temperaments,
          attributes: ["nombre"],
        },
      ],
    });

    const { imagen, nombre, altura, peso, anios } = dogFound;
    const temperaments = dogFound.temperaments.map((t) => t.nombre).join(", ");

    const d = {
      id,
      imagen,
      nombre,
      altura,
      peso,
      anios,
      temperamentos: temperaments,
    };

    dog = d;
  } else {
    const { data } = await axios.get(`${API_URL}/v1/breeds?api_key=${API_KEY}`);

    dogFound = data.find((dogId) => dogId.id == id);
    dog = mapeardog(dogFound);
  }

  return dog;
};

const mapeardog = (data) => {
  return {
    id: data.id,
    imagen: data.image.url,
    nombre: data.name,
    altura: data.height.metric,
    peso: data.weight.metric,
    anios: data.life_span,
    temperamentos: data.temperament,
    origen: "api",
  };
};

// BUSCA POR NOMBRE

const byName = async (name) => {
  let dogByName = [];
  const lookforBD = await Dog.findAll({
    include: [
      {
        model: Temperaments,
        attributes: ["nombre"],
      },
    ],
    where: { nombre: { [Op.iLike]: `%${name}%` } }, // op.ilike no distingue entre mayus y minus
  });

  lookforBD.map((dog) => {
    const { id, imagen, nombre, altura, peso, anios } = dog;
    const temperaments = dog.temperaments.map((t) => t.nombre).join(", ");

    const d = {
      id,
      imagen,
      nombre,
      altura,
      peso,
      anios,
      temperamentos: temperaments,
    };

    dogByName.push(d);
  });

  // buscar dog en la api
  const { data } = await axios(
    `${API_URL}/v1/breeds/search?q=${name}&api_key=${API_KEY}`
  );

  data.map((dog) => dogByName.push(mapeardog(dog)));

  return dogByName;
};

module.exports = { createDog, getDog, getDogId, byName };
