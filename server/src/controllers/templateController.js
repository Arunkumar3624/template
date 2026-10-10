const Template = require('../models/Template');

async function listTemplates(req, res, next) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ templates });
  } catch (err) {
    next(err);
  }
}

async function getTemplate(req, res, next) {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ template });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid template id' });
    }
    next(err);
  }
}

async function listCategories(req, res, next) {
  try {
    const categories = await Template.distinct('category');
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
}

module.exports = { listTemplates, getTemplate, listCategories };
