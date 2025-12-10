const { Game, Review } = require('../models');
const { Op } = require('sequelize');

exports.createGame = async (req, res) => {
  try {
    const { title, genre, platform, developer, releaseDate, description, coverUrl } = req.body;
    const game = await Game.create({ title, genre, platform, developer, releaseDate, description, coverUrl });
    return res.status(201).json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const game = await Game.findByPk(id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    await game.update(req.body);
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const game = await Game.findByPk(id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    await game.destroy();
    return res.json({ message: 'Game deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ...existing code...

exports.getGame = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const game = await Game.findByPk(id, {
      include: [{ 
        model: Review, 
        as: 'reviews',
        attributes: ['id', 'title', 'comment', 'rating', 'createdAt', 'userId'],
        include: [{ 
          model: require('../models').User, 
          as: 'author', 
          attributes: ['id', 'name', 'email'] 
        }]
      }]
    });
    if (!game) return res.status(404).json({ message: 'Game not found' });
    return res.json(game);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.listGames = async (req, res) => {
  try {
    const { q, genre, platform, page = 1, limit = 12 } = req.query;
    const where = {};
    if (q) where.title = { [Op.iLike]: `%${q}%` };
    if (genre) where.genre = genre;
    if (platform) where.platform = platform;

    const offset = (page - 1) * limit;
    const games = await Game.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
      order: [['createdAt','DESC']]
    });

    return res.json({
      total: games.count,
      page: Number(page),
      perPage: Number(limit),
      results: games.rows
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.topGames = async (req, res) => {
  try {
    const top = Number(req.query.top) || 10;
    const games = await Game.findAll({
      include: [{ model: Review, attributes: [] }],
      attributes: {
        include: [
          [Review.sequelize.fn('COUNT', Review.sequelize.col('Reviews.id')), 'reviewCount']
        ]
      },
      group: ['Game.id'],
      order: [[Review.sequelize.literal('reviewCount'), 'DESC']],
      limit: top
    });
    return res.json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
