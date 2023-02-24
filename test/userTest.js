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

describe("User Signup API", () => {
  describe("POST/api/users", () => {
    it("It should return User already exists with this email:", (done) => {
        const data = {
          userName: "Deepesh",
          userEmail: "abc@gmail.com",
          userPass: "abC@123",
          phoneNum: "9131447591",
          city: "indore",
          state: "Madhya Pradesh",
        };
        chai
         .request(server)
         .post("/user/register")
         .send(data)
         .end((err, res)=>{
          res.should.have.status(409);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("failure");
            res.body.should.have.property("message").eq("User already exists with this email");
            done();
         })
      });

    it("It should return register successfull:", (done) => {
      const data = {
        userName: "Deepesh",
        userEmail: "abcdef@gmail.com",
        userPass: "abC@123",
        phoneNum: "9131447591",
        city: "indore",
        state: "Madhya Pradesh",
      };
      chai
       .request(server)
       .post("/user/register")
       .send(data)
       .end((err, res)=>{
        res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have.property("message").eq("Registered successfully");
          done();
       })
    });
  });
});

describe("User Email For Reset Password API", () => {
    describe("POST/api/users", () => {
      it("It should send email to the user:", (done) => {
          const data = {
            userEmail: "cholkerdeepesh@gmail.com",
          };
          chai
           .request(server)
           .post("/user/email_reset_pass")
           .send(data)
           .end((err, res)=>{
            res.should.have.status(200);
              res.should.be.a("object");
              res.body.should.have.property("success").eq("success");
              res.body.should.have.property("message").eq("Email send successfully please check your inbox");
              res.body.should.have.property("token");
              res.body.should.have.property("userId");
              done();
           })
        });
    })
})        