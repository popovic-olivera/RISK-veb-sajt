process.env.NODE_ENV = "test";

const fs = require("fs");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../main");
// noinspection JSUnusedLocalSymbols
const should = chai.should();
chai.use(chaiHttp);

describe("BlogPosts", function () {

    const exampleBlogPost = {
        "date": "2020-07-21T11:17:54.743Z",
        "tags": [
            "Tag1",
            "Tag2"
        ],
        "author_id": "5f291a30e7a3e4461aa45bc3",
        "title": "Postman test2",
        "header_image": "InvalidURL",
        "author_image": "InvalidURL",
        "url_id": "URL",
        "content": "Content"
    }

    describe("GET /api/blogPosts", function () {
        it("should return status 200", function (done) {
            chai.request(server)
                .get("/api/blogPosts/")
                .send({})
                .end((err, res) => {
                    // noinspection JSUnresolvedFunction
                    res.should.have.status(200);
                    done();
                })
        })
    });

    describe("POST /api/blogPosts", () => {
        it("should return status 201", (done) => {
            chai.request(server)
                .post("/api/blogPosts")
                .send(exampleBlogPost)
                .end((err, res) => {
                    // noinspection JSUnresolvedFunction
                    res.should.have.status(201);
                    res.body.should.not.be.empty;
                    done();
                })
        });

        it('should fail when missing a required field', function (done) {
            // Title is missing from the payload
            chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                })
                .end((err, res) => {
                    // noinspection JSUnresolvedFunction
                    res.should.have.status(400);
                    res.body.should.have.property("message");
                    done();
                })
        });
    });

    describe("GET /api/blogPosts/:id", function () {
        it("should retrieve created blog post", async () => {
            const response = await chai.request(server)
                .post("/api/blogPosts")
                .send(exampleBlogPost);

            // noinspection JSUnresolvedFunction
            response.should.have.status(201);
            response.body.should.have.property("_id");
            const id = response.body._id;

            chai.request(server)
                .get(`/api/blogPosts/${id}`)
                .send()
                .end((err, res) => {
                    // noinspection JSUnresolvedFunction
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
                .send(exampleBlogPost);

            // noinspection JSUnresolvedFunction
            response.should.have.status(201);
            response.should.have.property("body");

            const responseBody = response.body;
            responseBody.title = "Updated title";

            const putResponse = await chai.request(server)
                .put(`/api/blogPosts/${responseBody._id}`)
                .send(responseBody)

            // noinspection JSUnresolvedFunction
            putResponse.should.have.status(200);
            putResponse.should.have.property("body");
            putResponse.body.title.should.be.equal("Updated title");

        });

        it('should fail when required fields are missing', async () => {
            const postReponse = await chai.request(server)
                .post("/api/blogPosts")
                .send(exampleBlogPost);

            // noinspection JSUnresolvedFunction
            postReponse.should.have.status(201);

            const id = postReponse.body._id;

            const blogPost = postReponse.body;

            // Delete a required field
            delete blogPost.title;

            const putResponse = await chai.request(server)
                .put(`/api/blogPosts/${id}`)
                .send(blogPost);

            // noinspection JSUnresolvedFunction
            putResponse.should.have.status(400);
            putResponse.body.should.have.property("message");
        });

        it("should fail when a field value isn't valid", async () => {
            const postReponse = await chai.request(server)
                .post("/api/blogPosts")
                .send({
                    "date": "2020-07-21T11:17:54.743Z",
                    "tags": [
                        "Tag1",
                        "Tag2"
                    ],
                    "author_id": "5f291a30e7a3e4461aa45bc3",
                    "title": "Postman test2",
                    "header_image": "Test",
                    "url_id": "URL",
                    "content": "Content"
                });

            const blogPost = postReponse.body;

            blogPost.date = "asdasdasd";

            const putResponse = await chai.request(server)
                .put(`/api/blogPosts/${blogPost._id}`)
                .send(blogPost);

            // noinspection JSUnresolvedFunction
            putResponse.should.have.status(400);
            putResponse.body.should.have.property("message");
        });
    });

    describe("DELETE /api/blogPosts", () => {
        it('should delete existing blog post', async () => {

            const postResponse = await chai.request(server)
                .post("/api/blogPosts")
                .send(exampleBlogPost);

            // noinspection JSUnresolvedFunction
            postResponse.should.have.status(201);
            postResponse.should.have.property("body");
            postResponse.body.should.have.property("_id");
            const id = postResponse.body._id;

            await chai.request(server)
                .delete(`/api/blogPosts/${id}`)
                .send()

            chai.request(server)
                .get(`/api/blogPosts/${id}`)
                .send()
                .end((err, res) => {
                    // noinspection JSUnresolvedFunction
                    res.should.have.status(404);
                })

        });
    });
});

describe("Users", function () {
    describe("Register with a profile picture", function () {
        it("Should store a picture", async function () {
            const registerResponse = await chai.request(server)
                .post("/api/user/register")
                .field("email", "test@foo.com")
                .field("firstName", "TestFirstName")
                .field("lastName", "TestLastName")
                .field("password", "asdasdasd")
                .attach("profilePicture", fs.readFileSync("test/testImage.png"), "profilePicture.png")

            registerResponse.should.have.status(200);

            const token = registerResponse.body.token;

            const profileResponse = await chai.request(server)
                .get("/api/user/profile")
                .set("Authorization", `Bearer ${token}`)
                .send()

            // noinspection JSUnresolvedFunction
            profileResponse.should.have.status(200);

        })
    })
})
