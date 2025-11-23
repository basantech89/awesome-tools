# Awesome Tools
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Details

- This project is a monorepo managed with [Nx](https://nx.dev/?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and [Bun](https://bun.sh/) as the package manager.

- Each workspace specified with `workspaces` key in `package.json` is a git submodule pointing to its own repository.

- This repository uses Biome as the linter.

- Commit messages should follow the Conventional Commits specification. Use the Commitizen tool configured in the repository to commit changes.

- The monorepo contains multiple packages and tools located in the `packages` and `tools` directories respectively.


## Tools

- Biome plugin for Nx is used to lint the projects in the monorepo located in the `tools/biome/` directory.

- Commitizen is set up to help create properly formatted commit messages according to the Conventional Commits specification located in the `tools/commitizen/` directory.

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/basantech89"><img src="https://avatars.githubusercontent.com/u/30287271?v=4?s=100" width="100px;" alt="Basant Soni"/><br /><sub><b>Basant Soni</b></sub></a><br /><a href="https://github.com/basantech89/awesome-tools/issues?q=author%3Abasantech89" title="Bug reports">🐛</a> <a href="https://github.com/basantech89/awesome-tools/commits?author=basantech89" title="Code">💻</a> <a href="#infra-basantech89" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/basantech89/awesome-tools/commits?author=basantech89" title="Documentation">📖</a> <a href="#plugin-basantech89" title="Plugin/utility libraries">🔌</a> <a href="#tool-basantech89" title="Tools">🔧</a> <a href="https://github.com/basantech89/awesome-tools/commits?author=basantech89" title="Tests">⚠️</a> <a href="#maintenance-basantech89" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!