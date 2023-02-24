const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/blogModelSchema");
const routes = require("../routes/blogRouters");

chai.should()
chai.use(chaiHttp);

describe("Blog Like API", () => {
    describe("POST/api/blogs", () => {
      it("It should return blog likes:", (done) => {
        const data = {
          blogLikes: true,
        };
        chai
          .request(server)
          .patch("/blog/like/63ef65df6042b06df01c5ec1")
          .send(data)
          .end((err, res) => {
            res.should.have.status(202);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("You liked the blog");
            done();
          });
      });
    });
  });