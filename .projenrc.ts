import { javascript, cdk } from "projen";
import { PROJEN_VERSION } from "./src";

const project = new cdk.JsiiProject({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  authorOrganization: true,
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  name: "@pepperize/projen-awscdk-construct",
  description: "This project provides a projen project type providing presets for an AWS CDK construct library project",
  keywords: ["aws", "cdk", "projen"],
  repositoryUrl: "https://github.com/pepperize/projen-awscdk-construct.git",

  projenrcTs: true,
  minNodeVersion: "22.13.0",
  workflowNodeVersion: "24.x",
  jsiiVersion: "~6.0.0",
  jestOptions: {
    jestVersion: "^30",
  },
  packageManager: javascript.NodePackageManager.YARN_CLASSIC,

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["pflorek", "acfo", "dependabot[bot]"],
    secret: "GITHUB_TOKEN",
  },
  dependabot: true,
  dependabotOptions: {
    labels: ["auto-approve"],
  },

  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 120,
    },
  },

  defaultReleaseBranch: "main",
  npmAccess: javascript.NpmAccess.PUBLIC,
  release: true,
  releaseToNpm: true,
  // publishToNuget: {
  //   dotNetNamespace: "Pepperize.Projen",
  //   packageId: "Pepperize.Projen.AwscdkConstruct",
  // },
  publishToPypi: {
    distName: "pepperize.projen-awscdk-construct",
    module: "pepperize_projen_awscdk_construct",
  },
  publishToMaven: {
    mavenGroupId: "com.pepperize",
    mavenArtifactId: "projen-awscdk-construct",
    javaPackage: "com.pepperize.projen.awscdk_construct",
  },

  gitignore: [".idea/", "*.iml", ".vscode"],

  devDeps: [`projen@${PROJEN_VERSION}`, "@types/node@^22"] /* Runtime dependencies of this module. */,
  peerDeps: [`projen@${PROJEN_VERSION}`],
});

project.setScript("format", "prettier --write src/**/*.ts test/**/*.ts .projenrc.[jt]s README.md");

// projen depends on the ESM-only "dax"; jest needs vm modules to require() it
project.testTask.env("NODE_OPTIONS", "--experimental-vm-modules");

project.tasks.tryFind("package:python")?.prependExec("pip3 install packaging");

project.synth();
