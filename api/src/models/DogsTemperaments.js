const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog_temperament",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, ///no acepta valores duplicados ni NULL.
      },

      id_dog: {
        type: DataTypes.INTEGER,
      },

      id_temperament: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      freezetablename: true,
    }
  );
};
