import Cat from '../models/Cat';
import Photo from '../models/Photo';

class CatController {
  async index(req, res) {
    const cats = await Cat.findAll({
      attributes: ['id', 'name', 'tag'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });
    res.json(cats);
  }

  async store(req, res) {
    try {
      const cat = await Cat.create(req.body);

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

      const cat = await Cat.findByPk(id, {
        attributes: ['id', 'name', 'tag'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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

      const cat = await Cat.findByPk(id);

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

      const cat = await Cat.findByPk(id);

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

export default new CatController();
