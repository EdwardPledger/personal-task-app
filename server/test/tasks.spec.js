const request = require('supertest');
const serverObject = require('../index');
const { createTask, createUpdateTask } = require('../util/task-util');

const { serverInstance } = serverObject;
const { dbInstance } = serverObject;

/**
 * UPDATE AFTER FRONT END (I.E. ANGULAR) IS USED; RESPONSES NOT FINALIZED YET
 */
beforeAll(() => {
  console.log('Jest Testing Suite...');
});

// Close the server
afterAll(() => {
  serverInstance.closeServer();
  dbInstance.closeDatabase();
  console.log('Testing complete. Closing server...');
});

describe('Task route testing...', () => {
  let response;
  let task;
  let testTask;

  test('Home Route Test...', async () => {
    response = await request(serverInstance.server).get('/');

    expect(response.status).toEqual(200);
    expect(response.res.statusMessage).toBe('Tasks returned.');
  });

  test('GET Task By Id Route Test...', async () => {
    const param = '5eb6f856945f732a58b151da';
    response = await request(serverInstance.server).get(`/get-task/${param}`);
    task = response.body;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('actualTime');
    expect(response.body).toHaveProperty('taskState');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('estimatedTime');
  });

  test('GET All Tasks Route Test...', async () => {
    response = await request(serverInstance.server).get('/get-tasks');

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test('POST Task Route Test...', async () => {
    const taskDto = {
      name: 'Test task',
      description: 'This is for testing purposes',
      estimatedTime: 3,
    };
    testTask = createTask(taskDto);
    response = await request(serverInstance.server).post('/add-task').send(task);

    expect(response.status).toBe(201);
    expect(response.res.statusMessage).toBe('Task inserted.');
  });

  test('PUT Task Route Test...', async () => {
    task.actualTime = 2; // Update task
    response = await request(serverInstance.server).put('/update-task').send(task);

    expect(response.status).toBe(200);
    expect(response.res.statusMessage).toBe('Task updated.');
  });

  test('DELETE Task By Id Route Test...', async () => {
    const param = testTask['_id'];
    response = await request(serverInstance.server).delete(`/delete-task/${param}`);

    expect(response.status).toBe(200);
    expect(response.res.statusMessage).toBe('Task deleted.');
  });

  /**
   * Initial test passed. Uncomment after thinking of a better way to test
   */
  // test('DELETE All Tasks Route Test...', async () => {
  //   response = await request(serverInstance.server).delete('/delete-all-tasks');

  //   expect(response.status).toBe(200);
  //   expect(response.res.statusMessage).toBe('Task deleted.');
  // });
});
