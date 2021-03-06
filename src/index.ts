import { awscdk, IniFile, javascript, Task } from "projen";

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
        allowedUsernames: ["pflorek", "acfo", "dependabot[bot]"],
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
      staleOptions: {
        pullRequest: {
          daysBeforeStale: 90,
          daysBeforeClose: 30,
          ...options.staleOptions?.pullRequest,
        },
        issues: {
          daysBeforeStale: 180,
          daysBeforeClose: 30,
          ...options.staleOptions?.pullRequest,
        },
        ...options.staleOptions,
      },
      gitignore: [...(options.gitignore || [])],
    });

    this.addDevDeps("ts-node@^10");

    this.gitignore.exclude(".idea/", "*.iml", ".vscode/");

    this.prettier?.addIgnorePattern("API.md");

    this.formatTask = this.addTask("format", {
      description: "Format with prettier",
      exec: "prettier --write src/**/*.ts test/**/*.ts .projenrc.[jt]s README.md",
    });

    // https://editorconfig.org/#file-format-details
    new IniFile(this, ".editorconfig", {
      obj: {
        ["root"]: true,
        ["*"]: {
          ["end_of_line"]: "lf",
          ["charset"]: "utf-8",
        },
        ["*.{js,ts}"]: {
          ["indent_style"]: "space",
          ["indent_size"]: 2,
          ["max_line_length"]: 120,
        },
      },
      marker: true,
    });
  }
}
