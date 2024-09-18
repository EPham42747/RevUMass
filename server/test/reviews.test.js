const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

require('dotenv').config({ debug: true, path: path.resolve(__dirname, '../config/.env.test') })

describe('Reviews API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
    console.log(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /review/:id should return review', async () => {
    const res = await request(app).get('/review/66eaf966f15fffba17cf94fb');
    expect(res.statusCode).toEqual(200);

    expect(res.body.data).toHaveProperty('author', '66e8c05aa3c76509afcb1034');
    expect(res.body.data).toHaveProperty('item', '66e8bfdba3c76509afcb1033');
    expect(res.body.data).toHaveProperty('rating', 4);
    expect(res.body.data).toHaveProperty('review', 'not bad!');
    expect(res.body.data).toHaveProperty('dateCreated', expect.stringContaining('2024-09-18T16:01:42.890'));
    expect(res.body.data).toHaveProperty('lastModified', expect.stringContaining('2024-09-18T16:01:42.890'));
  });

  it('GET /review/:id should fail for nonexistent review', async () => {
    const res = await request(app).get('/review/11aa1a1111a1111aa1aa1111');
    expect(res.statusCode).toEqual(404);
  });

  /*
  it('POST /food/review/add should add review', async () => {
    const res = await request(app)
      .post('/food/review/add')
      .send({
        author: '66e8c05aa3c76509afcb1034',
        item: '66e8bfdba3c76509afcb1033',
        rating: 4,
        review: 'not bad!',
      });
    expect(res.statusCode).toEqual(201);

    expect(res.body.data).toHaveProperty('author', '66e8c05aa3c76509afcb1034');
    expect(res.body.data).toHaveProperty('item', '66e8bfdba3c76509afcb1033');
    expect(res.body.data).toHaveProperty('rating', 4);
    expect(res.body.data).toHaveProperty('review', 'not bad!');
    expect(res.body.data).toHaveProperty('dateCreated');
    expect(res.body.data).toHaveProperty('lastModified');
  });
  */

  it('POST /review/add should fail for bad request', async () => {
    const res = await request(app)
      .post('/review/add')
      .send({
        author: '66e8c05aa3c76509afcb1034',
        rating: 4,
        review: 'not bad!',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.details).toEqual('\'item\' field missing');
  });

  it('PUT /review/:id/edit should update review', async () => {
    const res = await request(app)
      .put('/review/66eb1b2537e8362ce2bb7106/edit')
      .send({
        userId: '66e8c05aa3c76509afcb1034',
        data: {
          rating: 5,
          review: 'so good!',
        },
      });
    expect(res.statusCode).toEqual(204);
  });

  it('PUT /review/:id/edit should fail for nonexistent review', async () => {
    const res = await request(app)
      .put('/review/11aa1a1111a1111aa1aa1111/edit')
      .send({
        userId: '66e8c05aa3c76509afcb1034',
        data: {
          rating: 5,
          review: 'so good!',
        },
      });
    expect(res.statusCode).toEqual(404);
  });

  it('PUT /review/:id/edit should fail for wrong author', async () => {
    const res = await request(app)
      .put('/review/66eb1b2537e8362ce2bb7106/edit')
      .send({
        userId: '11aa1a1111a1111aa1aa1111',
        data: {
          rating: 5,
          review: 'so good!',
        },
      });
    expect(res.statusCode).toEqual(403);
  });

  /*
  it('DELETE /review/:id/delete should delete review', async () => {
    const res = await request(app)
      .delete('/review/66eb48c2ef6df3065d55d696/delete')
      .send({ userId: '66e8c05aa3c76509afcb1034' });
    expect(res.statusCode).toEqual(200);
  });
  */

  it('DELETE /review/:id/delete should fail for nonexistent review', async () => {
    const res = await request(app)
      .delete('/review/11aa1a1111a1111aa1aa1111/delete')
      .send({ userId: '66e8c05aa3c76509afcb1034' });
    expect(res.statusCode).toEqual(404);
  });

  it('DELETE /review/:id/delete should fail for wrong author', async () => {
    const res = await request(app)
      .delete('/review/66eb4941ef6df3065d55d697/delete')
      .send({ userId: '11aa1a1111a1111aa1aa1111' });
    expect(res.statusCode).toEqual(403);
  });
});
