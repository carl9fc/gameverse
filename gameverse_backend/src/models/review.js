const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    comment: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 5 },
    title: { type: DataTypes.STRING }
  }, {
    tableName: 'reviews',
    timestamps: true
  });

  return Review;
};