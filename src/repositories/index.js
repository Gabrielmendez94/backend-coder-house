import {TicketsDaoFactory, CartsDaoFactory, ProductsDaoFactory} from '../dao/factory.js';
import TicketsRepository from './ticket.repository.js';
import CartsRepository from './cart.repository.js';
import ProductsRepository from './products.repository.js';

const ticketsManager = TicketsDaoFactory.getDao();
const cartsManager = CartsDaoFactory.getDao();
const productsManager = ProductsDaoFactory.getDao();

export const ticketsRepository = new TicketsRepository(ticketsManager);
export const cartsRepository = new CartsRepository(cartsManager);
export const productsRepository = new ProductsRepository(productsManager);