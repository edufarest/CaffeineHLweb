const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const request = require("supertest");
const app = require("../app");
const Drink = require("../models/Drink");
const { assert } = require("chai");
const { done } = require("osmosis");


// drinkRecords
// drinks
// index
// user

describe("Drink", () => {

    const drink = {
        name: faker.name.findName(),
        servingSize: faker.random.number(),
        caffeine: faker.random.number()
    }

    const drinks = [drink, drink, drink];
    
    const CreateDrinkStub = sinon.stub(Drink, "create").resolves(drink)
    const FindDrink = sinon.stub(Drink, "find").withArgs().resolves(drinks);
    const DeleteDrinkStub = sinon.stub(Drink, "remove").resolves();

    it("Should create a drink", done => {

        request(app)
            .post('/drinks')
            .send(drink)
            .expect(201, drink, done);
            
        
    });

    it("should list drinks", done => {



        request(app)
            .get('/drinks')
            .expect(200, drinks, done)
    })

    it("should delete drinks", done => {

        const id = faker.random.number();

        request(app)
            .delete(`/drinks/${id}`)
            .expect(200, id.toString(), done)

    })


})

