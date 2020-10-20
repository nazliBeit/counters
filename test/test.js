let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../rest_api');

let expect = chai.expect;    // Using Expect style
chai.use(chaiHttp);

describe('counters API', ()=>{
    // test GET /counters/
    describe('GET /counters/', ()=> {
      it('response should be empty',(done)=> {
        chai.request(server)
          .get('/counters/')
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object').that.is.empty;
          done();
          });
      });
    });

    // test POST /counters
    describe('POST /counters', ()=> {
      it('response should be ok',(done)=> {
        const counters = {
          counter1:1,
          counter2:2
        };
        chai.request(server)
          .post('/counters')
          .send(counters)
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(200);
          done();
          });
      });
    });

    // test PUT /counters/:counter
    describe('PUT /counters/:counter', ()=> {
      it('increases a counter value by one',(done)=> {
        chai.request(server)
          .put('/counters/counter2')
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object').that.includes({counter2:3});
          done();
          });
      });
      it('fails if counter does not exist',(done)=> {
        chai.request(server)
          .put('/counters/counter3')
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(404);
          done();
          });
        });
      });

      // test DEL /counters/:counter
      describe('DEL /counters/:counter', ()=> {
        it('decreases counter value by one',(done)=> {
          chai.request(server)
            .del('/counters/counter2')
            .end((err, res) =>{
              if(err) done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object').that.includes({counter2:2});
            done();
            });
        });
        it('fails if counter does not exist',(done)=> {
          chai.request(server)
            .del('/counters/counter3')
            .end((err, res) =>{
              if(err) done(err);
              expect(res).to.have.status(404);
            done();
            });
          });
        it('counter disappears due to value <=0',(done)=> {
          chai.request(server)
            .del('/counters/counter1')
            .end((err, res) =>{
              if(err) done(err);
              expect(res.body).to.be.an('object').that.not.have.any.keys('counter1');
            done();
            });
        });
    });
    // test GET /counters/:counter
    describe('GET /counters/:counter', ()=> {
      it('response should be value of counter',(done)=> {
        chai.request(server)
          .get('/counters/counter2')
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(200);
            expect(res.text).to.equal('2');
          done();
          });
      });
      it('fails if counter does not exist',(done)=> {
        chai.request(server)
          .get('/counters/counter3')
          .end((err, res) =>{
            if(err) done(err);
            expect(res).to.have.status(404);
          done();
          });
        });
      });
});

function assertRunOrder(expectedRunOrder) {
  assert.equal(runOrder++, expectedRunOrder);
};
