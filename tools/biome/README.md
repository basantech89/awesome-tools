# Biome nx plugin and config for everyone 🚨

[![publish](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)
[![ci](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml)

## Table of Contents

- [Biome nx plugin and config for everyone 🚨](#biome-nx-plugin-and-config-for-everyone-)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Things to know](#things-to-know)
  - [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
  - [NX Biome Plugin](#nx-biome-plugin)
  - [Building](#building)
  - [Credits](#credits)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @awesome-tools/biome
```

## Usage

Add a biome.json to your project root with the following content:

```json5
{
	"extends": ["@awesome-tools/biome/config"]
}
```

Optionally, if you're using NX, prepend this plugin to your `nx.json`:

```json5
{
  "plugins": [
    "@awesome-tools/biome",
    // other plugins...
  ]
}
```

You can now lint your projects with biome using Nx:
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

## NX Biome Plugin

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build biome` to build the library.

## Credits

This project wouldn't have been possible without the amazing work done by

[Biome](https://biomejs.dev/)
[NX](https://nx.dev/)

