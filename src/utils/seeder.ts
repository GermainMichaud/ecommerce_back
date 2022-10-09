/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';

import { Cart } from '../models/cart.model';
import { Color } from '../models/color.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { Seller } from '../models/seller.model';
import { Size } from '../models/size.model';
import { Variant } from '../models/variant.model';
import {
  createColor,
  createProduct,
  createSeller,
  createSize,
  createVariant,
} from '../services';
import { connect, disconnect } from './db';
import log from './logger';
import { randomNumber } from './utils';

const sellers = [
  {
    name: `Seller 1`,
    email: 'test@seller1.com',
    address: 'Seller 1 Address',
    city: 'Seller 1 City',
    state: 'Seller 1 State',
    country: 'Seller 1 Country',
    zip_code: 'Seller 1 Zip Code',
    tax: 10,
    currency: 'EUR',
    currency_symbol: '€',
    phone: 'Seller 1 Phone',
    image: 'Seller 1 Image',
    rating: 4.5,
    productsToAdd: [0, 2, 4],
  },
  {
    name: `Seller 2`,
    email: 'test@seller2.com',
    address: 'Seller 2 Address',
    city: 'Seller 2 City',
    state: 'Seller 2 State',
    country: 'Seller 2 Country',
    zip_code: 'Seller 2 Zip Code',
    tax: 10,
    currency: 'EUR',
    currency_symbol: '€',
    phone: 'Seller 2 Phone',
    image: 'Seller 2 Image',
    rating: 2.5,
    productsToAdd: [1, 3],
  },
];

const products = [
  {
    product: {
      name: 'Remonte D8582, Bottes Hautes Femme',
      description:
        'Bottines;Bottines Chelsea;Bottes Chelsea;Bottes cowboy;Santiags;Bottes plateau;Bottes à lacets;Bottes d\'équitation;Bottes en caoutchouc;bottes de pluie;bottes imperméables;Bottes militaires;remonte; Hauteur du talon approximative 1 1/4 "',
      image:
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935415/test/Users/Germain/eco-shop/botte/51Y6S9T25cL._AC_UX575__cnevmi.jpg',
      images: [
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935415/test/Users/Germain/eco-shop/botte/51Y6S9T25cL._AC_UX575__cnevmi.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935424/test/Users/Germain/eco-shop/botte/416EXnOaLVS._AC_SY575._SX._UX._SY._UY__ly7gua.jpg',
      ],
      category: ['Femme'],
      quantity: 10,
      rating: 3.5,
      colors: [],
      sizes: [],
      variants: [],
    },
    colors: [
      {
        name: 'Marron',
        code: '#692e1e',
      },
      {
        name: 'Noir',
        code: '#333237',
      },
    ],
    sizes: [
      {
        name: '38EU',
        code: '38eu',
      },
      {
        name: '40EU',
        code: '40eu',
      },
    ],
  },
  {
    product: {
      name: 'Innerternet T-shirt décontracté pour homme',
      description: 'Chemise de trekking à manches courtes en jean',
      image:
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935359/test/Users/Germain/eco-shop/chemise/61ID7DPUMBS._AC_SX679._SX._UX._SY._UY__opjnpu.jpg',
      images: [
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935359/test/Users/Germain/eco-shop/chemise/61ID7DPUMBS._AC_SX679._SX._UX._SY._UY__opjnpu.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935344/test/Users/Germain/eco-shop/chemise/51VvgZwt-xS._AC_UX679__lmy4gt.jpg',
      ],
      category: ['Homme'],
      quantity: 100,
      rating: 2.5,
      colors: [],
      sizes: [],
      variants: [],
    },
    colors: [
      {
        name: 'Vert Olive',
        code: '#759183',
      },
      {
        name: 'Blanc',
        code: '#e5e5e5',
      },
    ],
    sizes: [
      { name: 'S', code: 's' },
      { name: 'M', code: 'm' },
      { name: 'L', code: 'l' },
      { name: 'XL', code: 'xl' },
    ],
  },
  {
    product: {
      name: 'PUMA Smash V2 L, Baskets Mixte',
      description:
        'Une chaussure qui allie performance, style et confort. Ce sneaker revisite le célèbre modèle Puma Smash. Autrefois simple chaussure de tennis, la Puma Smash v2 L est désormais un article de mode incontournable grâce à un cuir souple et une forme plus ajustée. Must absolu, les tennis procurent également un confort unique.',
      image:
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935276/test/Users/Germain/eco-shop/chaussure/61TubS5f1AL._AC_SX575._SX._UX._SY._UY__uo0dmt.jpg',
      images: [
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935276/test/Users/Germain/eco-shop/chaussure/61TubS5f1AL._AC_SX575._SX._UX._SY._UY__uo0dmt.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935259/test/Users/Germain/eco-shop/chaussure/611-PBRPEIL._AC_UX575__obefxh.jpg',
      ],
      category: ['Homme', 'Femme'],
      quantity: 30,
      rating: 4.5,
      colors: [],
      sizes: [],
      variants: [],
    },
    colors: [
      {
        name: 'Blanc',
        code: '#eef3f9',
      },
      {
        name: 'Noir',
        code: '#2d2e32',
      },
    ],
    sizes: [
      {
        name: '38EU',
        code: '38eu',
      },
      {
        name: '40EU',
        code: '40eu',
      },
      {
        name: '42EU',
        code: '42eu',
      },
      {
        name: '44EU',
        code: '44eu',
      },
    ],
  },
  {
    product: {
      name: 'Kuson Pantalon Homme Anti-Rides',
      description:
        'Kuson Pantalon Homme Anti-Rides 100% Coton Taille Normale Tube Droite Décontracté',
      image:
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935177/test/Users/Germain/eco-shop/pantalon/61HWfrsE9XL._AC_SY741._SX._UX._SY._UY__rqjrqb.jpg',
      images: [
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935177/test/Users/Germain/eco-shop/pantalon/61HWfrsE9XL._AC_SY741._SX._UX._SY._UY__rqjrqb.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935156/test/Users/Germain/eco-shop/pantalon/51Uc6rVYOHL._AC_UY741__hrelks.jpg',
      ],
      category: ['Homme'],
      quantity: 30,
      rating: 4.0,
      colors: [],
      sizes: [],
      variants: [],
    },
    colors: [
      {
        name: 'Taupe',
        code: '#988f86',
      },
      {
        name: 'Noir',
        code: '#222126',
      },
    ],
    sizes: [
      { name: 'FR 38', code: 'fr-38' },
      { name: 'FR 40', code: 'fr-40' },
      { name: 'FR 42', code: 'fr-42' },
      { name: 'FR 42-44', code: 'fr-42-44' },
      { name: 'FR 44', code: 'fr-44' },
      { name: 'FR 46', code: 'fr-46' },
      { name: 'FR 48', code: 'fr-48' },
    ],
  },
  {
    product: {
      name: 'Only Onlcaviar L/S Pullover KNT Noos Pull Femme',
      description:
        'This basic knit should be in every wardrobe. The longsleeve knit is easy to combine because of the simple design. It has a nice knitting pattern. It appears sporty because of the raglan sleeves which are connected with another knitting pattern.',
      image:
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935069/test/Users/Germain/eco-shop/pull/71JynKNiPuL._AC_SY679._SX._UX._SY._UY__sys5pq.jpg',
      images: [
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935069/test/Users/Germain/eco-shop/pull/71JynKNiPuL._AC_SY679._SX._UX._SY._UY__sys5pq.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935058/test/Users/Germain/eco-shop/pull/81wEOhYkTDL._AC_SY679._SX._UX._SY._UY__wlxkjr.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935047/test/Users/Germain/eco-shop/pull/71LLA5r9PRL._AC_SY679._SX._UX._SY._UY__lgmuzn.jpg',
        'https://res.cloudinary.com/dvvnxr30v/image/upload/v1664935039/test/Users/Germain/eco-shop/pull/71Hef8H9UHL._AC_SY679._SX._UX._SY._UY__yysivt.jpg',
      ],
      category: ['Femme'],
      quantity: 300,
      rating: 4.0,
      colors: [],
      sizes: [],
      variants: [],
    },
    colors: [
      {
        name: 'Rouge',
        code: '#714954',
      },
      {
        name: 'Jaune',
        code: '#d9a321',
      },
      {
        name: 'Pink Flambé',
        code: '#ed478f',
      },
      {
        name: 'Blue',
        code: '#254c87',
      },
    ],
    sizes: [
      { name: 'XS', code: 'xs' },
      { name: 'S', code: 's' },
      { name: 'M', code: 'm' },
      { name: 'L', code: 'l' },
      { name: 'XL', code: 'xl' },
    ],
  },
] as {
  product: Omit<
    Product,
    '_id' | 'seller' | 'sku' | 'addVariant' | 'addColor' | 'addSize' | 'removeQuantity'
  >;
  colors: Omit<Color, '_id'>[];
  sizes: Omit<Size, '_id'>[];
}[];

// We have only 2 sellers
const productsBySeller: Record<
  number,
  Record<string, Record<string, unknown> | unknown[]>[]
> = {};
for (const [idx, product] of products.entries()) {
  const index = idx % 2;
  if (!productsBySeller[index]) {
    productsBySeller[index] = [];
  }
  productsBySeller[index].push(product);
}

const temp = {
  sellers: [] as Seller[],
  products: [] as Product[],
  variants: [] as Variant[],
  colors: [] as Color[],
  sizes: [] as Size[],
  orders: [] as Order[],
  carts: [] as Cart[],
};

export const seed = async () => {
  log.info('Seeding...');

  // Create sellers
  for (const seller of sellers) {
    log.info('Creating seller...');
    const newSeller = await createSeller(seller);
    log.info(`Seller ${seller.name} created.`);
    temp.sellers.push(newSeller);

    const indexSellerInTemp = temp.sellers.findIndex((s) => s._id === newSeller._id);

    // For each seller, create products
    for (const productIndex of seller.productsToAdd) {
      const { product, colors, sizes } = products[productIndex];
      log.info('-Creating product...');
      const productCreated = await createProduct({
        sku: nanoid(),
        name: product.name,
        description: product.description as string,
        image: product.image,
        images: product.images,
        category: product?.category || [],
        quantity: product.quantity,
        rating: product.rating as number,
        colors: [],
        sizes: [],
        variants: [],
        seller: newSeller._id.toString(),
      });
      log.info('-Product created');
      temp.products.push(productCreated);
      const indexProductInTemp = temp.products.findIndex(
        (p) => p._id === productCreated._id,
      );

      // For each product, create colors
      const savedColors = [];
      for (const color of colors) {
        log.info('--Creating color...');
        const newColor = await createColor({
          ...color,
          product: productCreated._id.toString(),
        });
        log.info('--Color created');
        log.info('---Add color to product...');
        // await productCreated.addColor(newColor._id);
        log.info('---Color added to product');
        temp.colors.push(newColor);
        temp.products[indexProductInTemp].colors?.push(newColor);
        savedColors.push(newColor);
      }

      // For each product, create sizes
      const savedSizes = [];
      for (const size of sizes) {
        log.info('--Creating size...');
        const newSize = await createSize({
          ...size,
          product: productCreated._id.toString(),
        });
        log.info('--Size created');
        log.info('---Add size to product');
        // await productCreated.addSize(newSize._id);
        log.info('---Size added to product');
        temp.sizes.push(newSize);
        temp.products[indexProductInTemp].sizes?.push(newSize);
        savedSizes.push(newSize);
      }

      // For each product, create variants (colors x sizes)
      let defaultSet = false;
      for (const [colorIdx, color] of savedColors.entries()) {
        for (const size of savedSizes) {
          log.info('--Creating variant...');
          const variant = await createVariant({
            color: color._id.toString(),
            size: size._id.toString(),
            sku: nanoid(),
            name: `${product.name} - ${color.name}/${size.name}`,
            price: randomNumber(1000, 2000),
            quantity: randomNumber(0, 100),
            product: productCreated._id.toString(),
            image: product.images![colorIdx] || '',
            isDefault: defaultSet ? false : true,
            description: productCreated.description || '',
          });
          defaultSet = true;
          log.info('--Variant created');
          temp.variants.push(variant);
          log.info('---Add variant to product');
          await productCreated.addVariant(variant._id);
          log.info('---Variant added to product');
          temp.products[indexProductInTemp].variants?.push(variant._id);
        }
      }

      // Add product to seller
      log.info('-Add product to seller');
      await newSeller.addProduct(productCreated._id);
      temp.sellers[indexSellerInTemp].products?.push(productCreated._id);
      log.info('-Product added to seller');
    }
  }
  log.info('Seeding done.');
  log.info('-- Write data in ./data/data.json --');
  await writeFile('./data/data.json', JSON.stringify(temp, null, 2), {
    encoding: 'utf8',
  });
};

const seedDB = async () => {
  await connect();
  await seed();
  await disconnect();
};

void seedDB();
