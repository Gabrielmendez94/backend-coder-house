import chai from 'chai';
import supertest from 'supertest';


const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Endpoint de pruebas de los carritos", () => {
    describe("Prueba de carritos", () => {
  
      it("El endpoint POST '/api/carts' debe crear un carrito sin productos", async ()=> {
  
          const response = await requester.post('/api/carts')
  
          expect(response.status).to.equal(200)
          expect(response.ok).to.equal(true)
          expect(response.body).to.be.an('array')
  
      });

      it("El endpoint GET '/api/carts/:cid' debe retornar un carrito específico correctamente", async ()=>{
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