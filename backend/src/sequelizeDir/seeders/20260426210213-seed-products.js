'use strict';

const {v4: uuid} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        id: uuid(),
        name: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        stock: 99,
        image:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: uuid(),
        name: "Eyeshadow Palette with Mirror",
        description:
          "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        category: "beauty",
        price: 19.99,
        stock: 34,
        image:
          "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Powder Canister",
        description:
          "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
        category: "beauty",
        price: 14.99,
        stock: 89,
        image:
          "https://cdn.dummyjson.com/product-images/beauty/powder-canister/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },

      {
        id: uuid(),
        name: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        stock: 91,
        image:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Red Nail Polish",
        description:
          "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
        category: "beauty",
        price: 8.99,
        stock: 79,
        image:
          "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Calvin Klein CK One",
        description:
          "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
        category: "fragrances",
        price: 49.99,
        stock: 29,
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Chanel Coco Noir Eau De",
        description:
          "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
        category: "fragrances",
        price: 129.99,
        stock: 58,
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Dior J'adore",
        description:
          "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
        category: "fragrances",
        price: 89.99,
        stock: 98,
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Dolce Shine Eau de",
        description:
          "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
        category: "fragrances",
        price: 69.99,
        stock: 4,
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: uuid(),
        name: "Gucci Bloom Eau de",
        description:
          "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
        category: "fragrances",
        price: 79.99,
        stock: 91,
        image:
          "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/image.webp",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};
