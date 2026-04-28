'use strict';
const { v4: uuid } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: uuid(),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }, {
        id: uuid(),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  }
};
