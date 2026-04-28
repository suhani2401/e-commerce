'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      transaction_id: { type: Sequelize.STRING, allowNull: false },
      charge_id: { type: Sequelize.STRING, allowNull: false },
      amount: { type: Sequelize.FLOAT, allowNull: false },
      payable_id: { type: Sequelize.UUID, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payments");

  }
};
