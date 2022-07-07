import { resolve } from 'path';

import './database';

import express from 'express';

import homeRoutes from './routes/homeRoutes';
import catRoutes from './routes/catRoutes';
import photoRoutes from './routes/photoRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/cats/', catRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
