import { javascript, cdk } from "projen";
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
    mavenEndpoint: "https://s01.oss.sonatype.org",
    mavenGroupId: "com.pepperize",
    mavenArtifactId: "projen-awscdk-construct",
    javaPackage: "com.pepperize.projen.awscdk_construct",
  },

  gitignore: [".idea/", "*.iml", ".vscode"],

  deps: ["projen@0.62.27"] /* Runtime dependencies of this module. */,
  peerDeps: ["projen@0.62.27"],
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.setScript("format", "prettier --write src/**/*.ts test/**/*.ts .projenrc.[jt]s README.md");

project.tasks.tryFind("package:python")?.prependExec("pip3 install packaging");

project.addDevDeps("ts-node@^10");

project.synth();
