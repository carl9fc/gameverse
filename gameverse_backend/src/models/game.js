const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Game = sequelize.define('Game', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    platform: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    developer: { type: DataTypes.STRING },
    releaseDate: { type: DataTypes.DATE },
    coverUrl: { type: DataTypes.STRING } // URL de la imagen
  }, {
    tableName: 'games',
    timestamps: true
  });

  return Game;
};