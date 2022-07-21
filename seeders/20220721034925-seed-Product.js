'use strict';
const fs = require("fs")
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const product = JSON.parse(fs.readFileSync("./product.json"))
    const values = product.map(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
      delete e.id // BUAT NGEBUANG ID, cek di data, klo udah ada id, maka dipake
      return e

    })
    return queryInterface.bulkInsert("Products", values, {})
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Products", values, {})

  }
};
