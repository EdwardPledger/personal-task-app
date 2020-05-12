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

  test('Home Route Test...', async () => {
    response = await request(serverInstance.server).get('/');

    expect(response.status).toEqual(200);
    expect(response.res.statusMessage).toBe('Tasks returned.');
  });

  test('Get Task by Id Route Test...', async () => {
    const param = '5eb6f81cb3433729c498b771';
    response = await request(serverInstance.server).get(`/get-task/${param}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('actualTime');
    expect(response.body).toHaveProperty('taskState');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('estimatedTime');
  });

  test('Get All Tasks Route Test...', async () => {
    response = await request(serverInstance.server).get('/get-tasks');

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  });

  test('Post Task Route Test...', async () => {
    const taskDto = {
      name: 'Test task',
      description: 'This is for testing purposes',
      estimatedTime: 3,
    };
    const task = createTask(taskDto);
    response = await (await request(serverInstance.server).post('/add-task').send(task));

    expect(response.status).toBe(201);
    expect(response.res.statusMessage).toBe('Task inserted.');
  });

  test()
});
