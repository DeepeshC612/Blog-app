const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/userModelSchema");
const routes = require("../routes/userRouters");
const { upload } = require("../Middlewares/multiStoreMiddleware");

chai.should();
chai.use(chaiHttp);

// Login user test case
describe("User Login API", () => {
  describe("POST/api/users", () => {
    it("It should return login user detail:", (done) => {
      const data = {
        userEmail: "cholkerdeepesh2@gmail.com",
        userPass: "abW@123",
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

    // Invaild credentials test case
    it("It should return invaild credentials:", (done) => {
      const data = {
        userEmail: "cholkerdeepesh2@gmail.com",
        userPass: "abC@123",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("failure");
          res.body.should.have
            .property("message")
            .eq("Email or Password is not valid");
          done();
        });
    });

    // Not register user test case
    it("It should return not register user:", (done) => {
      const data = {
        userEmail: "cholkdeepesh2@gmail.com",
        userPass: "abW@123",
      };
      chai
        .request(server)
        .post("/user/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("failure");
          res.body.should.have
            .property("message")
            .eq("You are not valid register user");
          done();
        });
    });
  });
});

// Conflict userEmail test case
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
        .end((err, res) => {
          res.should.have.status(409);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("failure");
          res.body.should.have
            .property("message")
            .eq("User already exists with this email");
          done();
        });
    });

    // Register user successfully test case
    it("It should return register successfull:", (done) => {
      const data = {
        userName: "Deepesh",
        userEmail: "abcdefg@gmail.com",
        userPass: "abC@123",
        phoneNum: "9131447591",
        city: "indore",
        state: "Madhya Pradesh",
      };
      chai
        .request(server)
        .post("/user/register")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .field(data)
        .attach(
          "profilePic",
          "/Users/DELL/Downloads/WhatsApp Image 2023-02-16 at 10.59.57 PM (1).jpg",
          "WhatsApp Image 2023-02-16 at 10.59.57 PM (1).jpg"
        )
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("Registered successfully");
          done();
        });
    });
  });
});

// Email for reset password test case
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
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("Email send successfully please check your inbox");
          res.body.should.have.property("token");
          res.body.should.have.property("userId");
          done();
        });
    });

    //Not register user for Emailing test case
    it("It should return you are not registered user:", (done) => {
      const data = {
        userEmail: "cholkdeepesh@gmail.com",
      };
      chai
        .request(server)
        .post("/user/email_reset_pass")
        .send(data)
        .end((err, res) => {
          res.should.have.status(550);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("failure");
          res.body.should.have
            .property("message")
            .eq("You are not registered user");
          done();
        });
    });
  });
});

//User reset password test case
describe("User Reset Password API", () => {
  describe("POST/api/users", () => {
    it("It should reset password:", (done) => {
      const data = {
        newPass: "abW@123",
        confirmPass: "abW@123",
      };
      chai
        .request(server)
        .post(
          "/user/new_pass/63ed21e79183714930b68c1b/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VkMjFlNzkxODM3MTQ5MzBiNjhjMWIiLCJpYXQiOjE2NzcyMzE1NzgsImV4cCI6MTY3NzQwNDM3OH0.OXqkoDOIgEPa8MvXRn2eE7ncKYPv4WLQt6fiR4GGJII"
        )
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("Password reset successfully");
          done();
        });
    });
  });
});
