import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Endpoint de pruebas de los productos", () => {
    describe("Prueba de productos", () => {
  
      it("El endpoint GET '/api/products' debe retornar todos los productos", async ()=> {
        const response = await requester.get('/api/products');

        expect(response.status).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(response.body).to.be('array');

      });

      it("El endpoint GET '/api/products/:pid' debe retornar un producto específico correctamente", async ()=>{
        const pid = '64a0ca2bcf0a16babcee692f';
        const response = await requester.get(`/api/products/${pid}`);

        expect(response.status).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(response.body).to.be('array');
      });

      it("El endpoint POST '/api/products' debe crear un producto correctamente", async ()=>{
        const newDessert = {
            title: 'Pancake',
            description: 'Pancake Proteíco',
            code: 2595671,
            price: 499,
            stock: 25,
            category: 'Dessert',
        };
        const {statusCode, ok, _body} = await requester.post('/api/products').send(newDessert);
        expect(statusCode).to.equal(201);
        expect(ok).to.equal(true);
        expect(_body).to.deep.include(newDessert);
      });
/* TO DO 
      it("El endpoint PUT '/api/products/:pid' debe actualizar un producto especifico correctamente", async ()=>{
      });

      it("El endpoint DELETE '/api/products/:pid' debe eliminar un producto especifico correctamente", async ()=>{
      });*/
  })
});