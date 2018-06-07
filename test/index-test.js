const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaihttp);

describe('Node Server', () => {
    it('(GET /) return homepage', (done) => {
       chai.request(server)
       .get('/')
       .end((err, res) => {
           res.should.have.status(200);
           done();
       })
    })
})