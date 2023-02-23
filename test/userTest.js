const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/userModelSchema");
const routes = require("../routes/userRouters");

chai.should();
chai.use(chaiHttp);

describe("User Login API", () => {
  describe("POST/api/users", () => {
    it("It should return login user detail:", (done) => {
      const data = {
        userEmail: "cholkerdeepesh2@gmail.com",
        userPass: "abC@123",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have.property("message").eq("Login success");
          res.body.should.have.property("token");
          done();
        });
    });
  });
});