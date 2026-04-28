'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ordered_items", {
      id: { type: Sequelize.UUID, primaryKey: true, allowNull: false },
      order_id: { type: Sequelize.UUID, allowNull: false },
      product_id: { type: Sequelize.UUID, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("ordered_items", {
        fields: ["order_id"],
        type: "foreign key",
        name: "fk_orders_ordered_items",
        references: {
          table: "orders",
          field: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }, { transaction });

      await queryInterface.addConstraint("ordered_items", {
        fields: ["product_id"],
        type: "foreign key",
        name: "fk_products_ordered_items",
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
    await queryInterface.dropTable("ordered_items");
  }
};
