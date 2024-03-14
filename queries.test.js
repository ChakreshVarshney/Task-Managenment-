const {
  saveUserDetails,
  authenticate,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('./yourFile'); // Import the functions to be tested
const db = require('./db');

jest.mock('./db', () => ({
  query: jest.fn()
}));

describe('saveUserDetails', () => {
  it('should save user details', async () => {
      const request = {
          body: {
              userName: 'testuser',
              email: 'test@example.com',
              password: 'password'
          }
      };
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({});

      await saveUserDetails(request, response);

      expect(db.query).toHaveBeenCalledWith("INSERT INTO user_details (user_name,email,password) VALUES ($1, $2,$3)", ['testuser', 'test@example.com', 'password']);
      expect(response.json).toHaveBeenCalled();
  });

  it('should handle database error', async () => {
      const request = {
          body: {
              userName: 'testuser',
              email: 'test@example.com',
              password: 'password'
          }
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await saveUserDetails(request, response);

      expect(db.query).toHaveBeenCalledWith("INSERT INTO user_details (user_name,email,password) VALUES ($1, $2,$3)", ['testuser', 'test@example.com', 'password']);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('authenticate', () => {
  it('should authenticate user successfully', async () => {
      const request = {
          body: {
              userName: 'testuser',
              password: 'password'
          }
      };
      const response = {
          json: jest.fn()
      };
      const mockResult = { rowCount: 1 };
      db.query.mockResolvedValueOnce(mockResult);

      await authenticate(request, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM user_details where user_name = $1 and password = $2', ['testuser', 'password']);
      expect(response.json).toHaveBeenCalledWith('auth successful');
  });

  it('should handle authentication failure', async () => {
      const request = {
          body: {
              userName: 'testuser',
              password: 'password'
          }
      };
      const response = {
          json: jest.fn()
      };
      const mockResult = { rowCount: 0 };
      db.query.mockResolvedValueOnce(mockResult);

      await authenticate(request, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM user_details where user_name = $1 and password = $2', ['testuser', 'password']);
      expect(response.json).toHaveBeenCalledWith('auth failed');
  });

  it('should handle database error', async () => {
      const request = {
          body: {
              userName: 'testuser',
              password: 'password'
          }
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await authenticate(request, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM user_details where user_name = $1 and password = $2', ['testuser', 'password']);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('getTasks', () => {
  it('should retrieve tasks from the database', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1', description: 'Description 1' }, { id: 2, title: 'Task 2', description: 'Description 2' }];
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({ rows: mockTasks });

      await getTasks({}, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM task');
      expect(response.json).toHaveBeenCalledWith(mockTasks);
  });

  it('should handle database error', async () => {
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await getTasks({}, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM task');
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('getTaskById', () => {
  it('should retrieve a task by ID from the database', async () => {
      const taskId = 1;
      const mockTask = { id: taskId, title: 'Task 1', description: 'Description 1' };
      const request = {
          params: { id: taskId }
      };
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({ rows: [mockTask] });

      await getTaskById(request, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM task WHERE id = $1', [taskId]);
      expect(response.json).toHaveBeenCalledWith([mockTask]);
  });

  it('should handle database error', async () => {
      const taskId = 1;
      const request = {
          params: { id: taskId }
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await getTaskById(request, response);

      expect(db.query).toHaveBeenCalledWith('SELECT * FROM task WHERE id = $1', [taskId]);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('createTask', () => {
  it('should create a new task in the database', async () => {
      const taskData = { title: 'New Task', description: 'Description of the new task' };
      const request = {
          body: taskData
      };
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({});

      await createTask(request, response);

      expect(db.query).toHaveBeenCalledWith("INSERT INTO task (title, description,id) VALUES ($1, $2,nextval('increment_id'))", ['New Task', 'Description of the new task']);
      expect(response.json).toHaveBeenCalled();
  });

  it('should handle database error', async () => {
      const taskData = { title: 'New Task', description: 'Description of the new task' };
      const request = {
          body: taskData
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await createTask(request, response);

      expect(db.query).toHaveBeenCalledWith("INSERT INTO task (title, description,id) VALUES ($1, $2,nextval('increment_id'))", ['New Task', 'Description of the new task']);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('updateTask', () => {
  it('should update an existing task in the database', async () => {
      const taskId = 1;
      const taskData = { title: 'Updated Task', description: 'Updated description of the task' };
      const request = {
          params: { id: taskId },
          body: taskData
      };
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({});

      await updateTask(request, response);

      expect(db.query).toHaveBeenCalledWith('UPDATE task SET title = $1, description = $2 WHERE id = $3', ['Updated Task', 'Updated description of the task', taskId]);
      expect(response.json).toHaveBeenCalled();
  });

  it('should handle database error', async () => {
      const taskId = 1;
      const taskData = { title: 'Updated Task', description: 'Updated description of the task' };
      const request = {
          params: { id: taskId },
          body: taskData
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await updateTask(request, response);

      expect(db.query).toHaveBeenCalledWith('UPDATE task SET title = $1, description = $2 WHERE id = $3', ['Updated Task', 'Updated description of the task', taskId]);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});

describe('deleteTask', () => {
  it('should delete an existing task from the database', async () => {
      const taskId = 1;
      const request = {
          params: { id: taskId }
      };
      const response = {
          json: jest.fn()
      };
      db.query.mockResolvedValueOnce({});

      await deleteTask(request, response);

      expect(db.query).toHaveBeenCalledWith('DELETE FROM task WHERE id = $1', [taskId]);
      expect(response.json).toHaveBeenCalled();
  });

  it('should handle database error', async () => {
      const taskId = 1;
      const request = {
          params: { id: taskId }
      };
      const response = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
      };
      const error = new Error('Database error');
      db.query.mockRejectedValueOnce(error);

      await deleteTask(request, response);

      expect(db.query).toHaveBeenCalledWith('DELETE FROM task WHERE id = $1', [taskId]);
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Internal Server Error');
  });
});
