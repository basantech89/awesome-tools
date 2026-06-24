# Oxlint nx plugin for everyone 🚨

[![publish](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)
[![ci](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml)

## Table of Contents

- [Oxlint nx plugin for everyone 🚨](#oxlint-nx-plugin-for-everyone-)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Things to know](#things-to-know)
  - [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
  - [NX Oxlint Plugin](#nx-oxlint-plugin)
  - [Building](#building)
  - [Credits](#credits)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @awesome-tools/oxlint
```

## Usage

Add an .oxlint.json to your project root.

Optionally, if you're using NX, prepend this plugin to your `nx.json`:

```json5
{
	plugins: [
		'@awesome-tools/oxlint'
		// other plugins...
	]
}
```

You can now lint your projects with oxlint using Nx:

```shell
nx lint <project-name>
```

### Things to know

This project is meant to be used with [Nx](https://nx.dev).

## Issues

_Looking to contribute? Look for the [Good First Issue](https://github.com/basantech89/awesome-tools/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
label._ 😀

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/basantech89/awesome-tools/issues)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## NX Oxlint Plugin

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build oxlint` to build the library.

## Credits

This project wouldn't have been possible without the amazing work done by

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

[Eslint](https://eslint.org/)

[NX](https://nx.dev/)
