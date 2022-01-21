const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe("Articles", () => {
  describe("GET /", () => {
    it("should get all articles", (done) => {
      chai.request(app)
        .get('/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it("should get a single article", (done) => {
      const id = 1;
      chai.request(app)
        .get(`/articles/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });

    it("should not get a single article", (done) => {
      const id = 10;
      chai.request(app)
        .get(`/articles/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});