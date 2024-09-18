const path = require('path');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

require('dotenv').config({ debug: true, path: path.resolve(__dirname, '../config/.env.test') })

describe('Food API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI);
    console.log(process.env.DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  it('GET /food should return food items', async () => {
    const res = await request(app).get('/food');
    expect(res.statusCode).toEqual(200);

    expect(Array.isArray(res.body)).toBe(true);

    res.body.forEach(item => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('image');
      expect(item).toHaveProperty('dateCreated');
      expect(item).toHaveProperty('lastModified');
    });
  });

  it('GET /food/:id should return food item', async () => {
    const res = await request(app).get('/food/66ea2244b029a96ee453fd8c');
    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty('name', 'test_food');
    expect(res.body).toHaveProperty('image', 'link');
    expect(res.body).toHaveProperty('dateCreated', expect.stringContaining('2024-09-17T00:00:00.000'));
    expect(res.body).toHaveProperty('lastModified', expect.stringContaining('2024-09-17T00:00:00.000'));
  });

  it('GET /food/:id should return fail for nonexistent food item', async () => {
    const res = await request(app).get('/food/11aa1a1111a1111aa1aa1111');
    expect(res.statusCode).toEqual(404);
  });
});
