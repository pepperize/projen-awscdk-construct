[![GitHub](https://img.shields.io/github/license/pepperize/projen-awscdk-construct?style=flat-square)](https://github.com/pepperize/projen-awscdk-construct/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@pepperize/projen-awscdk-construct?style=flat-square)](https://www.npmjs.com/package/@pepperize/projen-awscdk-construct)
[![PyPI](https://img.shields.io/pypi/v/pepperize.projen-awscdk-construct?style=flat-square)](https://pypi.org/project/pepperize.projen-awscdk-construct/)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/pepperize/projen-awscdk-construct/release/main?label=release&style=flat-square)](https://github.com/pepperize/projen-awscdk-construct/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/pepperize/projen-awscdk-construct?sort=semver&style=flat-square)](https://github.com/pepperize/projen-awscdk-construct/releases)

# Projen awscdk-construct

This project provides a projen project type providing presets for an AWS CDK construct library project.

## Getting started

To create a new project, run the following command and follow the instructions:

```shell
mkdir my-project
cd my-project
git init -b main
npx projen new --from @pepperize/projen-awscdk-construct
```

_If your git cli doesn't have a `-b` option, either update [git](https://git-scm.com/) or issue `git init && git checkout -b main`._

## Usage

To init a new project from this module:

```shell
npx projen new --from @pepperize/projen-awscdk-construct@latest
```

_Note: it will install the `latest` version. If you don't specify the `latest` version, it won't be upgraded while running `npx projen`_

## Create a new projen project type

1. Create a new project for the projen external jsii npm module
   ```shell
   mkdir my-project
   cd my-project
   git init -b main
   npx projen new jsii
   ```
2. Your `src/index.ts` should export only one project.
