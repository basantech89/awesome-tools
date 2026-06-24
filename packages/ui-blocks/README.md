# Awesome UI Blocks Library for everyone ⚡️

[![publish](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)
[![ci](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/basantech89/awesome-tools/actions/workflows/ci.yml)
[![publish-storybook-ui-blocks](https://github.com/basantech89/awesome-tools/actions/workflows/chromatic-ui-blocks.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/chromatic-ui-blocks.yml)

## Table of Contents

- [Awesome UI Blocks Library for everyone ⚡️](#awesome-ui-blocks-library-for-everyone-️)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Issues](#issues)
    - [🐛 Bugs](#-bugs)
    - [💡 Feature Requests](#-feature-requests)
  - [NX](#nx)
  - [Building](#building)
    - [Credits](#credits)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `dependencies`:

```
npm install --save @awesome-tools/ui-blocks
```

## Usage

Import the styles.css file in your project:

```css
@import '@awesome-tools/ui-blocks/styles.css';
```

You don't need to import the styles.css file from `@awesome-tools/ui` package as the styles from `@awesome-tools/ui-blocks` package already include the styles from `@awesome-tools/ui` package.

Source the `@awesome-tools/ui` and `@awesome-tools/ui-blocks` packages so that tailwind can find and include the styles to generate:

```css
@source '../../../../node_modules/@awesome-tools/ui/dist';
@source '../../../../node_modules/@awesome-tools/ui-blocks/dist';
```

> [!NOTE]
> You'll have to source the `@awesome-tools/ui` package even if you're not directly using it in your project since the `@awesome-tools/ui-blocks` package depends on the `@awesome-tools/ui` package.

import the package in your module:

```typescript
import { Auth } from '@awesome-tools/ui-blocks'
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

Run `nx build ui-blocks` to build the library.

### Credits

This project wouldn't have been possible without the amazing work done by

[Base UI](https://base-ui.com/)

[Shadcn UI](https://ui.shadcn.com/)

[Storybook](https://storybook.js.org/)

[Chromatic](https://www.chromatic.com/)

[TailwindCSS](https://tailwindcss.com/)

[Tanstack React Table](https://tanstack.com/table/latest)
