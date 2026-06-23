import { Project } from "../projects/project.model";
import { ProjectService } from "../projects/project.service";

const mockQuery = (data: any) => ({
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockResolvedValue(data),
});

jest.mock("../projects/project.model");
describe("ProjectService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create project", async () => {
    (Project.create as jest.Mock).mockResolvedValue({
      _id: "1",
      title: "Test Project",
    });

    const result = await ProjectService.create(
      { title: "Test Project" },
      "userId",
    );

    expect(Project.create).toHaveBeenCalled();
    expect(result.title).toBe("Test Project");
  });

  it("should return all projects", async () => {
    (Project.find as jest.Mock).mockReturnValue(mockQuery([{ _id: "1" }]));

    (Project.countDocuments as jest.Mock).mockResolvedValue(1);

    const result = await ProjectService.findAll("userId", {});

    expect(Project.find).toHaveBeenCalledWith({ owner: "userId" });
    expect(result.data.length).toBe(1);
  });

  it("should throw if project not found", async () => {
    (Project.findOne as jest.Mock).mockResolvedValue(null);

    await expect(ProjectService.findById("1", "userId")).rejects.toEqual({
      statusCode: 404,
      message: "Project not found",
    });
  });
});
