const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "temperaments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, ///no acepta valores duplicados ni NULL.
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, // propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },
    },
    {
      timestamps: false,
      freezetablename: true,
    }
  );
};
