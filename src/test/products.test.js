import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Endpoint de pruebas de los productos", () => {
    describe("Prueba de productos", () => {
  
      it("El endpoint GET '/api/products' debe retornar todos los productos", async ()=> {
      });

      it("El endpoint GET '/api/products/:pid' debe retornar un carrito específico correctamente", async ()=>{
      });

      it("El endpoint PUT '/api/carts/:cid' debe actualizar un carrito correctamente", async ()=>{
      });

      it("El endpoint POST '/api/carts/:cid/product/:pid' debe agregar un producto especifico en un carrito especifico correctamente", async ()=>{
      });

      it("El endpoint DELETE '/api/carts/:cid/product/:pid' debe eliminar un producto especifico en un carrito especifico correctamente", async ()=>{
      });

      it("El endpoint POST '/api/carts/:cid/checkout' debe redireccionarnos para finalizar una compra correctamente", async()=>{
      });
  })
});