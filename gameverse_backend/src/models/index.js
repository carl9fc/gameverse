const sequelize = require('../config/db');
const defineUser = require('./user');
const defineGame = require('./game');
const defineReview = require('./review');

const User = defineUser(sequelize);
const Game = defineGame(sequelize);
const Review = defineReview(sequelize);

// Asociaciones
Game.hasMany(Review, { foreignKey: 'gameId', as: 'reviews' });
Review.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = {
  sequelize,
  User,
  Game,
  Review
};