'use strict';
const {v4: uuid} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: uuid(),
        role: 'admin'
      }, {
        id: uuid(),
        role: 'user'
      }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  }
};
