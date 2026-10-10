const express = require('express');
const {
  listTemplates,
  getTemplate,
  listCategories,
} = require('../controllers/templateController');

const router = express.Router();

router.get('/', listTemplates);
router.get('/meta/categories', listCategories);
router.get('/:id', getTemplate);

module.exports = router;
