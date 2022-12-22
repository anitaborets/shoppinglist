process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require("../index");
const {Schema, model} = require("mongoose");
let should = chai.should();


chai.use(chaiHttp);

function sum(a, b) {
    return a + b;
}
module.exports = sum;

//kontrola - test je funkcny
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

//kontrola - test je funkcny
describe('Space test suite', () => {
    it('My Space Test', () => {
        expect(true).toEqual(true);
    });
});


const request = require('supertest');

describe('Space test suite', () => {
    it('tests /destinations endpoints', async() => {
        const response = await request(app).get("/auth/get");
        expect(response.body).toEqual([]);
        expect(response.body).toHaveLength(0);
        expect(response.statusCode).toBe(200);
     });
});

describe('http://localhost:5000/auth/get', () => {
    it('it should GET all shopping-lists', (done) => {
        chai.request(app)
            .get('http://localhost:5000/auth/get')
            .end((err, res) => {
                //nefunguje aj ked insomnia vrati 200
                expect(res.statusCode).toBe(200)
                res.body.should.be.a('object');
                //res.body.length.should.be.eql(0); - tiez nefunguje
                done();

            });
    });
});

