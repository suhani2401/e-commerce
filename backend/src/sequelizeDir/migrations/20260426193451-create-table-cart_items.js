'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cart_items", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      cart_id: { type: Sequelize.UUID, allowNull: false },
      product_id: { type: Sequelize.UUID, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("cart_items", {
        fields: ["cart_id"],
        type: "foreign key",
        name: "fk_cart_cart_items",
        references: {
          table: "cart",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }, { transaction });

      await queryInterface.addConstraint("cart_items", {
        fields: ["product_id"],
        type: "foreign key",
        name: "fk_products_cart_items",
        references: {
          table: "products",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }, { transaction });
    })
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("cart_items");
  }
};
