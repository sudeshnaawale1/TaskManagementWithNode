import { addTask, getAllTasks, updateAllTask, deleteTask } from "../../controllers/task-controller";
import taskModel from "../../model/task-model";
import httpMocks from "node-mocks-http";
import newTask from "../mock-data/new-task.json";
import allTasks from "../mock-data/all-tasks.json";

jest.mock("../../model/task-model")

let req, res;
let taskId = "667294d882e3a2dccbfd4e40"

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("deleteTask", () => {
  it("should have a deleteTask function", () => {
    expect(typeof deleteTask).toBe("function");
  });
  it("should delete taskModel.findByIdAndDelete", async () => {
    req.params.id = taskId;
    await deleteTask(req, res, next);
    expect(taskModel.findByIdAndDelete).toBeCalledWith(taskId);
  });

  it("should delete taskModel.findByIdAndDelete and return response with status 200", async () => {
    taskModel.findByIdAndDelete.mockReturnValue(newTask);
    await deleteTask(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: "Task deleted successfully", task: newTask });
  });

  it("should handle error", async () => {
    const errMsg = { message: "error finding" };
    const rejectedPromise = Promise.reject(errMsg);
    taskModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await deleteTask(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
})

describe("updateTask", () => {
  it("should have a updateAllTask function", ()=>{
    expect(typeof updateAllTask).toBe("function");
  });
  it("should update taskModel.findOneAndUpdate", async ()=>{
    req.params.id = taskId;
    req.body = newTask;
    await updateAllTask(req, res, next);
    expect(taskModel.findOneAndUpdate).toHaveBeenCalledWith({ _id: taskId }, newTask, {
      new: true,
      useFindAndModify : false
    });
  });
  it("should update taskModel.findOneAndUpdate and response with status 200", async() =>{
    req.params.id = taskId;
    req.body = newTask;
    taskModel.findOneAndUpdate.mockReturnValue(newTask);
    await updateAllTask(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTask);
  });

  it("should handle error", async () => {
    const errMsg = { message: "error finding" };
    const rejectedPromise = Promise.reject(errMsg);
    taskModel.findOneAndUpdate.mockReturnValue(rejectedPromise);
    await updateAllTask(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });

})

describe("getAllTasks", () => {
  it("should have a getAllTasks function", () => {
    expect(typeof getAllTasks).toBe("function");
  });

  it("should find taskModel.find()", async () => {
    await getAllTasks(req, res, next);
    expect(taskModel.find).toHaveBeenCalledWith({});
  });
  
  it("should return all response with status 200", async () => {
    taskModel.find.mockReturnValue(allTasks);
    await getAllTasks(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTasks);
  });

  it("should handle error", async () => {
    const errMsg = { message: "error finding" };
    const rejectedPromise = Promise.reject(errMsg);
    taskModel.find.mockReturnValue(rejectedPromise);
    await getAllTasks(req, res, next);
    expect(next).toHaveBeenCalledWith(errMsg);
  });
});

describe("addTask", () => {
  beforeEach(() => {
    req.body = newTask;
  });
  it("should have a addTask function", () => {
    expect(typeof addTask).toBe("function");
  });

  it("should call taskModel.create", async () => {
    await addTask(req, res, next);
    expect(taskModel.create).toHaveBeenCalledWith(newTask);
  });

  it("should return json body in response 200", async () => {
    taskModel.create.mockReturnValue(newTask);
    await addTask(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTask);
  });

  it("should handle error", async () => {
    const errMsg = { message: "Some properties are missing" };
    const rejectedPromise = Promise.reject(errMsg);
    taskModel.create.mockReturnValue(rejectedPromise);
    await addTask(req, res, next);
    expect(next).toBeCalledWith(errMsg);
  });
});
