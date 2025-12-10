const { Review, Game, User } = require('../models');

exports.listReviews = async (req, res) => {
  try {
    const { gameId } = req.params;
    if (!gameId) return res.status(400).json({ message: 'gameId required' });

    const reviews = await Review.findAll({
      where: { gameId },
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { comment, rating, title } = req.body;
    const user = req.user;

    console.log('createReview:', { gameId, comment, rating, user }); // DEBUG

    if (!user) return res.status(401).json({ message: 'Authentication required' });
    if (!gameId) return res.status(400).json({ message: 'gameId required' });
    if (!comment || !comment.trim()) return res.status(400).json({ message: 'Comment required' });

    const game = await Game.findByPk(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const review = await Review.create({
      comment,
      rating: rating || 5,
      title: title || null,
      gameId: parseInt(gameId),
      userId: user.id
    });

    const result = await Review.findByPk(review.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
    });

    res.status(201).json(result);
  } catch (err) {
    console.error('CreateReview error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) return res.status(401).json({ message: 'Authentication required' });

    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (user.role !== 'admin' && review.userId !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await review.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};