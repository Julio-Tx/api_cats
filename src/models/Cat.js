import Sequelize, { Model } from 'sequelize';

export default class Cat extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      tag: {
        type: Sequelize.STRING,
        defaultValue: [''],
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'cat_id' });
  }
}
