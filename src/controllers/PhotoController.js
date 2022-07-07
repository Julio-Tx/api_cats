import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Cat from '../models/Cat';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

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
        const photo = await Photo.create({ originalname, filename, cat_id });

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
      const cat = await Cat.findByPk(id);
      const photos = await Photo.findAll();
      if (!cat) {
        return res.json({ errors: ['cat não existe'] });
      }
      const photo = photos.filter((vl) => vl.cat_id === Number(id));
       if (photo.length === 0 || null) {
        return res.json({ errors: ['Não a fotos '] });
      }
      photo[0].destroy();

      fullPath = path.join(__dirname, `../../uploads/images/${photo[0].getDataValue('filename')}`);

    } catch (e) {
      console.log(e);
      return res.json(e);
    }
    
      try {
      fs.unlink(fullPath, function (err){
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

export default new PhotoController();
