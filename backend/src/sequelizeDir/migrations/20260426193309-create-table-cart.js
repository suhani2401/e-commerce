'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.createTable("cart", {
        id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
        user_id: { type: Sequelize.UUID, allowNull: false },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
        deleted_at: { type: Sequelize.DATE, allowNull: true },
      });

      await queryInterface.addConstraint("cart", {
        fields: ["user_id"],
        type: "foreign key",
        name: "fk_users_cart",
        references: {
          table: "users",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("cart");
  }
};
