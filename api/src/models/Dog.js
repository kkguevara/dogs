const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID, //identificador unico alfanumerico, se crea un id con numeros y letras
        primaryKey: true, ///clave primaria, no acepta valores duplicados ni NULL.
        defaultValue: DataTypes.UUIDV4,
      },

      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 10],
            msg: "El nombre del perro debe contener entre 3 y 10 caracteres",
          },
        },
      },

      altura: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      peso: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anios: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false, // para no agregue fecha de creacion y actualizacion
      freezetablename: true, // mantener el nombre de la tabla
    }
  );
};
