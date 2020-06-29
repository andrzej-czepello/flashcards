const expect = require('chai').expect;
const request = require('supertest')
const app = require('../backend/app');
const mongoose = require("mongoose");


describe('Flashcard controller', () => {
  before((done) => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zuqln.mongodb.net/${process.env.MONGO_TEST_DATABASE}?retryWrites=true&w=majority`)
      .then(() => {
        app.listen(process.env.TEST_PORT);
        done();
    })
    .catch(err => console.log(err));
  })

  after((done) => {
    mongoose.disconnect().then(() => done());
  })

  it('should show homepage with flashcards', (done) => {
    request(app).get('/api/flashcards').expect(200, done);
  })

  it('should add flashcard', (done) => {
    request(app).post('/api/flashcards')
    .send({title: 'testTitle', content: 'testContent'})
    .then((res) => {
      const body = res.body;
      expect(res.status).to.equal(201);
      expect(body).to.contain.property('message').to.equal("Flashcard added sucessfully");
      done();
    }).catch(done);
  })
})
