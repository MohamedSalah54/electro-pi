import { Project } from "../projects/project.model";
import { Task } from "../tasks/task.model";
import { TaskService } from "../tasks/task.service";

const mockQuery = (data: any) => ({
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue(data),
});

jest.mock("../projects/project.model");
jest.mock("../tasks/task.model");

describe("TaskService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should throw if project not found", async () => {
      (Project.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        TaskService.create("p1", "u1", { title: "Task" }),
      ).rejects.toEqual({
        statusCode: 404,
        message: "Project not found",
      });
    });

    it("should create task", async () => {
      (Project.findOne as jest.Mock).mockResolvedValue({ _id: "p1" });

      (Task.create as jest.Mock).mockResolvedValue({
        _id: "t1",
        title: "Task",
      });

      const result = await TaskService.create("p1", "u1", {
        title: "Task",
      });

      expect(Task.create).toHaveBeenCalled();
      expect(result._id).toBe("t1");
    });
  });

  it("should return tasks", async () => {
    (Project.findOne as jest.Mock).mockResolvedValue({ _id: "p1" });

    (Task.find as jest.Mock).mockReturnValue(mockQuery([{ _id: "t1" }]));

    (Task.countDocuments as jest.Mock).mockResolvedValue(1);

    const result = await TaskService.findAll("p1", "u1", {});

    expect(result.data.length).toBe(1);
  });
});
