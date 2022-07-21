'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Store)
    }
  }
  User.init({
    email: {type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email cannot be null"
        },
        notEmpty: {
          msg: "email cannot be Empty"
        }
      }},
    password: {type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null"
        },
        notEmpty: {
          msg: "password cannot be Empty"
        }
      }},
    StoreId: {type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: " cannot be null"
        },
        notEmpty: {
          msg: " cannot be Empty"
        }
      }},
    role: {type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "role cannot be null"
        },
        notEmpty: {
          msg: "role cannot be Empty"
        }
      }},
    userName: {type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user name cannot be null"
        },
        notEmpty: {
          msg: "user name cannot be Empty"
        }
      }},
  }, {
    hooks:{
        beforeCreate(instance,options){
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};