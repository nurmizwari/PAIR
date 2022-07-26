'use strict';
module.exports = {
   up(queryInterface, Sequelize) {
    return  queryInterface.createTable('Users',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      StoreId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Stores',
          key: 'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade'
      },
      role: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return  queryInterface.dropTable('Users');
  }
};