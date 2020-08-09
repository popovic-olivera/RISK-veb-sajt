process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../main");
// noinspection JSUnusedLocalSymbols
const should = chai.should();
chai.use(chaiHttp);

describe("BlogPosts", function () {

    describe("GET /api/blogPosts", function () {
        it("should return status 200", function (done) {
            chai.request(server)
                .get("/api/blogPosts/")
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("POST /api/blogPosts", () => {
        it("should return status 201", (done) => {
            chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "title": "Postman test2",
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.not.be.empty;
                    done();
                })
        });
    });

    describe("GET /api/blogPosts/:id", function () {
        it("should retrieve created blog post", async () => {
            const response = await chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "title": "Postman test2",
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                });

            response.should.have.status(201);
            response.body.should.have.property("_id");
            const id = response.body._id;

            chai.request(server)
                .get(`/api/blogPosts/${id}`)
                .send()
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property("body");
                    res.body.should.have.property("_id");
                    res.body._id.should.be.equal(id);
                });

        })
    });

    describe("PUT /api/blogPosts", () => {
        it('should edit existing blog post', async () => {

            const response = await chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "title": "Postman test2",
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                });

            response.should.have.status(201);
            response.should.have.property("body");

            const responseBody = response.body;
            responseBody.title = "Updated title";

            chai.request(server)
                .put(`/api/blogPosts/${responseBody._id}`)
                .send(responseBody)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property("body");
                    res.body.title.should.be.equal("Updated title");
                })

        });
    });

    describe("DELETE /api/blogPosts", () => {
        it('should delete existing blog post', async () => {

            const postResponse = await chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "title": "Postman test2",
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                });

            postResponse.should.have.status(201);
            postResponse.should.have.property("body");
            postResponse.body.should.have.property("_id");
            const id = postResponse.body._id;

            const deleteResponse = await chai.request(server)
                .delete(`/api/blogPosts/${id}`)
                .send()

            chai.request(server)
                .get(`/api/blogPosts/${id}`)
                .send()
                .end((err, res) => {
                    res.should.have.status(404);
                })

        });
    });
});
