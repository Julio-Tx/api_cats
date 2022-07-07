"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Cat = require('../models/Cat'); var _Cat2 = _interopRequireDefault(_Cat);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);



const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo');

class PhotoController {
  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { cat_id } = req.body;
        const photo = await _Photo2.default.create({ originalname, filename, cat_id });

        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['cat does not exist'],
        });
      }
    });
  }
  async delete(req, res) {

    let fullPath = '';

    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing Cat ID'],
        });
      }
      const cat = await _Cat2.default.findByPk(id);
      const photos = await _Photo2.default.findAll();
      if (!cat) {
        return res.json({ errors: ['cat não existe'] });
      }
      const photo = photos.filter((vl) => vl.cat_id === Number(id));
       if (photo.length === 0 || null) {
        return res.json({ errors: ['Não a fotos '] });
      }
      photo[0].destroy();

      fullPath = _path2.default.join(__dirname, `../../uploads/images/${photo[0].getDataValue('filename')}`);

    } catch (e) {
      console.log(e);
      return res.json(e);
    }
    
      try {
      _fs2.default.unlink(fullPath, function (err){
        if(err) {
          console.log('Error deleting');
          console.log(err);
        }else {
          console.log('Sucess');
        }
      })
      //file removed

      console.log('ok');
      return res.json('ok');
    } catch (e) {
      console.log(e);
      return res.json(e);
    }
  }
}

exports. default = new PhotoController();
