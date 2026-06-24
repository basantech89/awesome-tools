# Install Awesome Tools in your NX Project Root with Scaffolder 🚀

[![publish](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)
[![ci](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml)

## Table of Contents

- [Install Awesome Tools in your NX Project Root with Scaffolder 🚀](#install-awesome-tools-in-your-nx-project-root-with-scaffolder-)
  - [Table of Contents](#table-of-contents)
  - [Installation and Usage](#installation-and-usage)
  - [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
  - [NX](#nx)
  - [Building](#building)

## Installation and Usage

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `dependencies`

Create a NX workspace first:

```bash
npx create-nx-workspace@latest my-app
```

Now install the generator

```bash
cd my-app && nx add @awesome-tools/scaffolder
```

Execute below command in the root of your NX workspace to install awesome tools

```bash
npx nx g @awesome-tools/scaffolder:tools
```

By default, it will not overwrite existing files. To force overwriting, use the `-f` flag:

```bash
npx nx g @awesome-tools/scaffolder:tools -f
```

This will add the following files to your NX workspace root:

- `.github/workflows/ci.yml`
  - The CI workflow to validate affected projects with nx by running targets lint, test, build, and typecheck.
- `.vscode/launch.json`
  - Attach debugger to your already running process by its pid or attach to the debugging server running on port 9229 on your local machine or in a docker container.
- `.oxlintrc.json`
  - Oxlint configuration file to lint your projects across the codebase with oxc.
- `.oxfmtrc.json`
  - Oxfmt configuration file to format your projects across the codebase with oxc.
- `cz.config.ts`
  - Commitizen configuration file to standardize commit messages with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
  - For examples, look at [this repo](https://github.com/basantech89/awesome-tools/)
- `commitlint.config.ts`
  - Lint your commits
- `.husky/commit-msg`
  - Commit msg git hook to lint the commit when you commit to git
- `.husky/pre-commit`
  - Pre commit git hook to force branch naming conventions and validate staged projects with NX by running targets lint, test, build, and typecheck.
- `.husky/pre-push`
  - Pre push git hook to make sure that the commits being pushed are signed.

Also, it make below updates to root package.json file

- Add below scripts

  ```json
  "prepare": "husky",
  "contributors:init": "all-contributors init",
  "contributors:add": "all-contributors add",
  "contributors:generate": "all-contributors generate",
  "format": "bun oxfmt",
  "format:check": "bun oxfmt --check",
  "validate": "nx run-many -t format lint test typecheck build",
  "validate:affected":
    "nx affected -t format lint test typecheck build --tui false",
  "release": "nx release --first-release --skip-publish"
  ```

- Add latest versions of below dev dependencies

  ```text
  @awesome-tools/oxlint
  @awesome-tools/commitizen
  cz-git
  @commitlint/cli
  @commitlint/config-conventional
  @commitlint/types
  commitlint-config-gitmoji
  husky
  all-contributors-cli
  oxlint
  oxfmt
  @types/node
  ```

- Add latest versions of below prod dependencies
  ```text
  @awesome-tools/ui
  @awesome-tools/ui-blocks
  @awesome-tools/utils
  tailwindcss
  tailwind-merge
  tailwind-variants
  @dnd-kit/abstract
  @dnd-kit/dom
  @dnd-kit/helpers
  @dnd-kit/react
  @tanstack/react-table
  date-fns
  react-day-picker
  sonner
  zod
  ```

Install dependencies

```bash
npm install
```

## Issues

_Looking to contribute? Look for the [Good First Issue](https://github.com/basantech89/awesome-tools/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
label._ 😀

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/basantech89/awesome-tools/issues)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## NX

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build scaffolder` to build the library.
