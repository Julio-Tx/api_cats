"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Cat = require('../models/Cat'); var _Cat2 = _interopRequireDefault(_Cat);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class CatController {
  async index(req, res) {
    const cats = await _Cat2.default.findAll({
      attributes: ['id', 'name', 'tag'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['url', 'filename'],
      },
    });
    res.json(cats);
  }

  async store(req, res) {
    try {
      const cat = await _Cat2.default.create(req.body);

      return res.json(cat);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const cat = await _Cat2.default.findByPk(id, {
        attributes: ['id', 'name', 'tag'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!cat) {
        return res.status(400).json({
          errors: ['cat não existe'],
        });
      }

      return res.json(cat);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const cat = await _Cat2.default.findByPk(id);

      if (!cat) {
        return res.status(400).json({
          errors: ['cat não existe'],
        });
      }

      await cat.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const cat = await _Cat2.default.findByPk(id);

      if (!cat) {
        return res.status(400).json({
          errors: ['cat não existe'],
        });
      }

      const catAtualizado = await cat.update(req.body);
      return res.json(catAtualizado);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
}

exports. default = new CatController();
