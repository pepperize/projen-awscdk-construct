import { TurborepoProject } from 'projen-turborepo';
import { javascript, cdk } from "projen";

const turbo = new TurborepoProject({
  authorName: "Patrick Florek",
  authorEmail: "patrick.florek@gmail.com",
  authorOrganization: true,
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  name: "projen-components",
  packageName: "@pepperize/projen-components",
  defaultReleaseBranch: 'main',
  devDeps: ['projen-turborepo'],
  projenrcTs: true,

  pathMapping: true,
  jestModuleNameMapper: true,
  projectReferences: true,
  parallelWorkflows: true,
  vscodeMultiRootWorkspaces: true,

  gitignore: [".idea/", "*.iml", ".vscode"],
});

new cdk.JsiiProject({
  author: "Patrick Florek",
  authorAddress: "patrick.florek@gmail.com",
  authorOrganization: true,
  license: "MIT",
  copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
  name: "@pepperize/projen-awscdk-construct",
  outdir: "packages/awscdk-construct",
  parent: turbo,
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

  deps: ["projen"],
  peerDeps: ["projen"],

  scripts: {
    "format": "prettier --write src/**/*.ts test/**/*.ts .projenrc.[jt]s README.md"
  },
});

turbo.synth();