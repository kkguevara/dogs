const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID, //identificador unico alfanumerico
        primaryKey: true, ///no acepta valores duplicados ni NULL.
        defaultValue: DataTypes.UUIDV4
      },

      imagen: {
        type: DataTypes.STRING,
        allowNull: false, // propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false, // propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },

      altura: {
        type: DataTypes.INTEGER,
        allowNull: false, // propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },
      peso: {
        type: DataTypes.INTEGER,
        allowNull: false, // propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },
      anios: {
        type: DataTypes.INTEGER,
        allowNull: false, //  propiedad booleana que permite la ausencia de cualquier valor (null) permite si o no
      },
    },
    {
      timestamps: false, // para no agregue fecha de creacion y actualizacion
      freezetablename: true, // mantener el nombre de la tabla 
    }
  );
};
