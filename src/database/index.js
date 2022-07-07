import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Cat from '../models/Cat';
import Photo from '../models/Photo';

const models = [Cat, Photo];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
