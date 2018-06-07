const chai = require('chai');
const chaihttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaihttp);

let token;
let movieId;

describe('/api/movies test', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'BurakT', password: 'q1w2e3r4t5y6u7'})
            .end((err, res) => {
                token = res.body.token;
                done();
            })
    });

    describe('/GET movies test', () => {
        it("it should GET all the movies", (done) => {
            chai.request(server)
             .get('/api/movies')
             .set('x-access-token', token)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('array');
                 done();
             })
        })
     });

     //control test
     describe('/POST movie test', () => {
        it("it should POST a movie", (done) => {
            const movie = {
                title: "Mocha Mocha",
                director_id: "5b0e3bbe00fd1603d0cae42c",
                category: "Mocha",
                country: "Mocha",
                year: 1950,
                imdb_score: 2
            };

            chai.request(server)
             .post('/api/movies')
             .send(movie)
             .set('x-access-token', token)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('country');
                 res.body.should.have.property('year');
                 res.body.should.have.property('imdb_score');
                 movieId = res.body._id;
                 done();
             })
        })
     });

     describe('/GET/:movie_id movie test', () => {
        it("it should GET movie by the given id", (done) => {
            chai.request(server)
             .get('/api/movies/'+ movieId)
             .set('x-access-token', token)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('country');
                 res.body.should.have.property('year');
                 res.body.should.have.property('_id').eql(movieId);
                 done();
             })
        })
     });

       describe('/PUT/:movie_id movie test', () => {
        it("it should UPDATE a movie given by id", (done) => {
            const movie = {
                title: "Mocha Mocha Put",
                director_id: "5b0e3bbe00fd1603d0cae42c",
                category: "Mocha",
                country: "Mocha",
                year: 1950,
                imdb_score: 2
            };

            chai.request(server)
             .put('/api/movies/'+ movieId)
             .send(movie)
             .set('x-access-token', token)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title').eql(movie.title);
                 res.body.should.have.property('director_id').eql(movie.director_id)
                 res.body.should.have.property('category').eql(movie.category)
                 res.body.should.have.property('country').eql(movie.country)
                 res.body.should.have.property('year').eql(movie.year)
                 res.body.should.have.property('imdb_score').eql(movie.imdb_score)
                 done();
             })
        })
     });

     describe('/DELETE/:movie_id movie test', () => {
        it("it should DELETE a movie given by id", (done) => {
            chai.request(server)
             .delete('/api/movies/'+ movieId)
             .set('x-access-token', token)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('country');
                 res.body.should.have.property('year');
                 res.body.should.have.property('imdb_score');
                 done();              
             })
        })
     });


});

