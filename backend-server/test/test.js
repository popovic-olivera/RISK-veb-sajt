const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../main");
// noinspection JSUnusedLocalSymbols
const should = chai.should();
chai.use(chaiHttp);

// Example test.
describe("BlogPosts", function () {
    describe("GET", function () {
        it("should get all available blog posts", function (done) {
            chai.request(server)
                .get("/blogPosts/")
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("Response body: " + res.body);
                    done();
                })
        })
    })
});
