const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const utils = require("../models/blogModelSchema");
const routes = require("../routes/blogRouters");

chai.should();
chai.use(chaiHttp);

//Add blog api test case
describe("Add Blog API", () => {
  describe("POST/api/blogs", () => {
    it("It should add blog:", (done) => {
      const data = {
        blogTitle: "blog making",
        blogDescription: "How was your day today",
      };
      chai
        .request(server)
        .post("/blog/create/63ecbf59bb59469a5febac6e")
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("Blog published successfully");
          done();
        });
    });
  });
});

//Blog like test case
describe("Blog Like API", () => {
  describe("PATCH/api/blogs", () => {
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

//Search blog test case
describe("Search blog API", () => {
  describe("GET/api/blogs", () => {
    it("It should search all blogs:", (done) => {
      const data = {
        blogTitle: "this",
      };
      chai
        .request(server)
        .get("/blog/search")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("object");
          res.body.should.have.property("success").eq("success");
          res.body.should.have
            .property("message")
            .eq("Here are matching blogs");
          done();
        });
    });
  });
});

//Userblog api test case
describe("Myblog API", () => {
  describe("POST/api/blogs", () => {
    it("It should return all blogs related to user:", (done) => {
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkMjFlNzkxODM3MTQ5MzBiNjhjMWIiLCJpYXQiOjE2NzcyMzg4MjUsImV4cCI6MTY3NzY3MDgyNX0.D2tEMLwpJT4dYS_n1muQnR7ZOd1um-_m1avupx6NcJk"
      chai
        .request(server)
        .post("/blog/63ed21e79183714930b68c1b")
        .set("Authorization", `Bearer ${token}`) //jwt token of logged in user
        .end((err, res)=>{
          res.should.have.status(200)
          res.should.be.a("object")
          res.body.should.have.property("success").eq("success")
          res.body.should.have.property("message").eq("Here are your blogs")
        done()
        })
    });
  });
});

//List of all blog test case
describe("List All Blog API", () => {
  describe("GET/api/blogs", () => {
    it("It should return all blogs list:", (done) => {
      chai
        .request(server)
        .get("/blog/list")
        .end((err, res)=>{
          res.should.have.status(200)
          res.should.be.a("object")
          res.body.should.have.property("success").eq("success")
          res.body.should.have.property("message").eq("Here are list of all blogs")
        done()
        })
    });
  });
});

//Detail of blog test case
describe("Detail Blog API", () => {
  describe("POST/api/blogs", () => {
    it("It should return detail of blog:", (done) => {
      chai
        .request(server)
        .post("/blog/details/63ef68303b4df394cbd875a0")
        .end((err, res)=>{
          res.should.have.status(200)
          res.should.be.a("object")
          res.body.should.have.property("success").eq("success")
          res.body.should.have.property("message").eq("Here is the blog")
        done()
        })
    });
  });
});

//Edit blog test case
describe("Edit Blog API", () => {
  describe("PATCH/api/blogs", () => {
    it("It should edit the blog:", (done) => {
      const editData = {
        blogTitle: "This is"
      }
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkMjFlNzkxODM3MTQ5MzBiNjhjMWIiLCJpYXQiOjE2NzcyMzg4MjUsImV4cCI6MTY3NzY3MDgyNX0.D2tEMLwpJT4dYS_n1muQnR7ZOd1um-_m1avupx6NcJk"
      chai
        .request(server)
        .patch("/blog/edit/63ef68303b4df394cbd875a0")
        .send(editData)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res)=>{
          res.should.have.status(201)
          res.should.be.a("object")
          res.body.should.have.property("success").eq("success")
          res.body.should.have.property("message").eq("blog is updated successfully")
        done()
        })
    });
  });
});

//delete blog test case
describe("Delete Blog API", () => {
  describe("DELETE/api/blogs", () => {
    it("It should delete the blog:", (done) => {
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2VkMjFlNzkxODM3MTQ5MzBiNjhjMWIiLCJpYXQiOjE2NzcyMzg4MjUsImV4cCI6MTY3NzY3MDgyNX0.D2tEMLwpJT4dYS_n1muQnR7ZOd1um-_m1avupx6NcJk"
      chai
        .request(server)
        .delete("/blog/delete/63ef68303b4df394cbd875a0")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res)=>{
          res.should.have.status(204)
          res.should.be.a("object")
        done()
        })
    });
  });
});
