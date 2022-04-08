import { awscdk, javascript, Task } from "projen";

export class AwsCdkConstructLibrary extends awscdk.AwsCdkConstructLibrary {
  /**
   * The "format" task.
   */
  public readonly formatTask: Task;

  /**
   * @experimental
   */
  constructor(options: awscdk.AwsCdkConstructLibraryOptions) {
    super({
      ...options,
      authorOrganization: true,
      license: "MIT",
      copyrightOwner: "Pepperize UG (haftungsbeschränkt)",
      autoApproveUpgrades: true,
      autoApproveOptions: {
        ...options.autoApproveOptions,
        allowedUsernames: ["unerty", "pflorek", "acfo", "dependabot[bot]"],
        label: "auto-approve",
        secret: "GITHUB_TOKEN",
      },
      depsUpgradeOptions: {
        ...options.depsUpgradeOptions,
        workflowOptions: {
          ...options.depsUpgradeOptions?.workflowOptions,
          secret: "PROJEN_GITHUB_TOKEN",
        },
      },
      dependabot: true,
      dependabotOptions: {
        labels: ["auto-approve"],
      },
      eslint: true,
      prettier: true,
      prettierOptions: {
        ...options.prettierOptions,
        settings: {
          ...options.prettierOptions?.settings,
          printWidth: 120,
        },
      },
      defaultReleaseBranch: "main",
      npmAccess: javascript.NpmAccess.PUBLIC,
      release: true,
      gitignore: [...(options.gitignore || [])],
    });

    this.gitignore.exclude(".idea/", "*.iml");

    this.prettier?.addIgnorePattern("API.md");
    this.formatTask = this.addTask("format", {
      description: "Format with prettier",
      exec: "prettier --write src/{**/,}*.ts test/{**/,}*.ts .projenrc.js README.md",
    });

    this.jest?.addTestMatch("<rootDir>/**/?(*.)@(spec|test).[tj]s?(x)");
  }

  postSynthesize() {
    super.postSynthesize();

    this.tasks.tryFind("package:python")?.prependExec("pip3 install packaging");
  }
}
