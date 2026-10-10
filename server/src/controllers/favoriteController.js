const User = require('../models/User');
const Template = require('../models/Template');

async function addFavorite(req, res, next) {
  try {
    const { templateId } = req.params;

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const user = await User.findById(req.userId);

    const alreadyFavorited = user.favorites.some((id) => id.equals(template._id));
    if (alreadyFavorited) {
      return res.status(409).json({ message: 'Template already in favorites' });
    }

    user.favorites.push(template._id);
    await user.save();

    res.status(201).json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid template id' });
    }
    next(err);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const { templateId } = req.params;

    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter((id) => !id.equals(templateId));
    await user.save();

    res.status(200).json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (err) {
    next(err);
  }
}

async function getFavorites(req, res, next) {
  try {
    const user = await User.findById(req.userId).populate('favorites');
    res.status(200).json({ templates: user.favorites });
  } catch (err) {
    next(err);
  }
}

module.exports = { addFavorite, removeFavorite, getFavorites };
