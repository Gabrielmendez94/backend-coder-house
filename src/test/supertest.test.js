import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

//OBJETIVO: TESTEAR productsRouter, cartsRouter y sessionsRouter

describe('Testing de la API', ()=>{
    describe('Test de Products', ()=>{
        it('El endpoint POST /api/products/ debe crear un producto correctamente', async ()=>{
            const nuevoPostre = {
                title: 'Pancake',
                description: 'Pancake Proteíco',
                code: 2595671,
                price: 499,
                stock: 25,
                category: 'Dessert',
            };
            const {statusCode, ok, _body} = await requester.post('/api/products').send(nuevoPostre);
            expect(statusCode).to.equal(201);
            expect(ok).to.equal(true);
            expect(_body).to.deep.include(nuevoPostre);
        })
    })
})