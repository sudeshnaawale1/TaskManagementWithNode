import { addTask } from "../../controllers/task-controller";
import taskModel from "../../model/task-model";
import httpMocks from "node-mocks-http";
import newTask from "../mock-data/new-task.json";

taskModel.create = jest.fn();
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe("addTask", () => {
  beforeEach(() => {    
    req.body = newTask;
  });
  it("should have a addTask function", () => {
    expect(typeof addTask).toBe("function");
  });

  it("should call taskModel.create", async () => {
    await addTask(req, res);
    expect(taskModel.create).toHaveBeenCalledWith(newTask);
  });
});
