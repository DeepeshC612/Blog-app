const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/commentsModelSchema");
const routes = require("../routes/commentRouters");
const { addComment } = require("../controllers/commentControllers");

chai.should();
chai.use(chaiHttp);

describe("Comment API", () => {
    describe("POST/api/comment", () => {
      it("It should return comment detail:", (done) => {
        const data = {
          blogComment: "This is a comment for blog",
        };
        chai
          .request(server)
          .post("/comment/create/63ecbf59bb59469a5febac6e/63ef68303b4df394cbd875a0")
          .send(data)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("Comment added successfully");
            done();
          });
      });
    });
  });