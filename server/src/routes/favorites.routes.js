const express = require('express');
const requireAuth = require('../middleware/auth');
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require('../controllers/favoriteController');

const router = express.Router();

router.use(requireAuth);

router.get('/', getFavorites);
router.post('/:templateId', addFavorite);
router.delete('/:templateId', removeFavorite);

module.exports = router;
