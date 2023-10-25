const {
  createDog,
  getDog,
  getDogId,
  byName,
} = require("../controllers/dogsController");

const createDogHandler = async (req, res) => {
  try {
    const { imagen, nombre, altura, peso, anios, temperamentos } = req.body;
    const response = await createDog(
      imagen,
      nombre,
      altura,
      peso,
      anios,
      temperamentos
    );
    // 201 http code created
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogHandler = async (req, res) => {
  try {
    const { name } = req.query;
    let response = null;
    if (!name) {
      response = await getDog();
    } else {
      response = await byName(name);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDogIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getDogId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDogHandler, createDogHandler, getDogIdHandler };
