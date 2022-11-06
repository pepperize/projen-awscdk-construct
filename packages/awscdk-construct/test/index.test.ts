import { AwsCdkConstructLibrary } from "../src";

describe("AwsCdkConstructLibrary", () => {
  it("", () => {
    // Given
    const project = new AwsCdkConstructLibrary({
      cdkVersion: "1.139.0",
      ...defaultOptions,
    });

    // Then
    expect(project.formatTask.description).toEqual("Format with prettier");
  });
});

const defaultOptions = {
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  clobber: false,
  defaultReleaseBranch: "main",
  jest: false,
  name: "test-project",
  repositoryUrl: "https://github.com/pepperize/projen-awscdk-construct.git",
} as const;
