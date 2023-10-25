const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "DogTemperaments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
