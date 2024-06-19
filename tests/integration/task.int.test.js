// task.int.test.js

const request = require("supertest");
const newTask = require("../mock-data/new-task.json");
const { app, server } = require("../../index");

const endPointUrl = "/tasks/";

describe(endPointUrl, () => {
  let server, newTaskId;
  const testData = {title: "PUT Test Title", description: "PUT Test Descp", comment: "PUT Test Comment", status: true };

  beforeAll(() => {
    const { app: serverApp, server: srv } = require("../../index");
    server = srv || serverApp.listen(8000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it(`GET ${endPointUrl}`, async () => {
    const response = await request(app).get(endPointUrl);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    expect(response.body[0].comment).toBeDefined();
    expect(response.body[0].status).toBeDefined();
  });

  it(`POST ${endPointUrl}`, async () => {
    const response = await request(app).post(endPointUrl).send(newTask);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.comment).toBe(newTask.comment);
    expect(response.body.status).toBe(newTask.status);
    newTaskId = response.body._id;
  });

  it(`PUT ${endPointUrl}:id`, async () => {
    const response = await request(app)
      .put(endPointUrl + newTaskId)
      .send(testData);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.description).toBe(testData.description);
    expect(response.body.comment).toBe(testData.comment);
    expect(response.body.status).toBe(testData.status);
  });

  it(`DELETE`, async () => {
    const response = await request(app)
      .delete(endPointUrl + newTaskId)
      .send();
    expect(response.statusCode).toBe(200);
    expect(response.body.task.title).toBe(testData.title);
    expect(response.body.task.description).toBe(testData.description);
    expect(response.body.task.comment).toBe(testData.comment);
    expect(response.body.task.status).toBe(testData.status);
  });

  it(`should return error 500 on malformed data ${endPointUrl}`, async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send({ title: "Missing some properties" });
    expect(response.statusCode).toBe(500);
  });
});
