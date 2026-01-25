# Install Awesome Tools in your NX Project Root with Scaffolder 🚀

[![CI](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)

## Table of Contents

- [Install Awesome Tools in your NX Project Root with Scaffolder 🚀](#install-awesome-tools-in-your-nx-project-root-with-scaffolder-)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
  - [NX](#nx)
  - [Building](#building)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `dependencies`:

```
npm install --save-dev @awesome-tools/scaffolder
```

## Usage

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

Run `nx build utils` to build the library.
