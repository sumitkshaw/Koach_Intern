import request from 'supertest';
import app from '../app';  // Path to your Express app
import mongoose from 'mongoose';
import User from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  const url = process.env.MONGODB_URI_TEST as string;
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Authentication and CRUD Tests', () => {
  let token: string;
  let userId: string;

  // Test user registration
  it('should register a user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
    token = response.body.token;  // Save the token for later tests
    userId = response.body.userId;  // Save the user ID for later tests
  });

  // Test user login
  it('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  // Test getting user profile
  it('should get the user profile', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty('name', 'Test User');
    expect(response.body.user).toHaveProperty('email', 'testuser@example.com');
  });

  // Test updating user profile
  it('should update the user profile', async () => {
    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updateduser@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile updated successfully');
  });

  // Test deleting user profile
  it('should delete the user profile', async () => {
    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Profile deleted successfully');
  });
});
