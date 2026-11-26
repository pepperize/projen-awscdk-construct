import { Testing } from "projen";
import { AwsCdkConstructLibrary } from "../src";

describe("AwsCdkConstructLibrary", () => {
  it("", () => {
    // Given
    const project = new AwsCdkConstructLibrary({
      cdkVersion: "2.1.0",
      ...defaultOptions,
    });

    // Then
    expect(project.formatTask.description).toEqual("Format with prettier");
  });

  it("Should configure a valid mergify merge method", () => {
    // Given
    const project = new AwsCdkConstructLibrary({
      cdkVersion: "2.1.0",
      ...defaultOptions,
    });

    // When
    const mergify = Testing.synth(project)[".mergify.yml"];

    // Then
    expect(mergify).toContain("merge_method: merge");
    expect(mergify).not.toMatch(/queue:\n\s+name: default\n\s+method:/);
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
