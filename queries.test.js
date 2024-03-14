const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');

beforeAll(async () => {
  // Creating tables or performing migrations before running tests
  // For example, I want to create a tasks table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      user_id INT NOT NULL
    )
  `);
});

// afterAll(async () => {
//   // Clean up after all tests
//   await pool.query('DROP TABLE IF EXISTS tasks');
// });

describe('Task Management', () => {
  let taskId;
  let userId=7;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        user_id: userId, // Modify with an existing user id
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    taskId = response.body.id;
  });

  it('should retrieve all tasks', async () => {
    const response = await request(app).get(`/api/tasks/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should retrieve a task by its ID', async () => {
    const response = await request(app).get(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', taskId);
  });

  it('should update a task', async () => {
    const response = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({
        title: 'Updated Test Task',
        description: 'This is an updated test task',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Test Task');
  });

  it('should delete a task', async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted successfully');
  });
});
