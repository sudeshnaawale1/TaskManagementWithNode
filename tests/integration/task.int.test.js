// task.int.test.js

const request = require("supertest");
const newTask = require("../mock-data/new-task.json");
const { app, server  } = require("../../index"); 

const endPointUrl = "/tasks";

describe(endPointUrl, () => {
    let server;
  
    beforeAll(() => {
      const { app: serverApp, server: srv } = require("../../index");
      server = srv || serverApp.listen(8000);
    });
  
    afterAll((done) => {
      server.close(done);
    });
  
    it(`POST ${endPointUrl}`, async () => {
      const response = await request(app)
        .post(endPointUrl)
        .send(newTask);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(newTask.title);
      expect(response.body.description).toBe(newTask.description);
      expect(response.body.comment).toBe(newTask.comment);
      expect(response.body.status).toBe(newTask.status);
    });
  });
  