# Commitizen for multi or mono repo projects 🔥

[![CI](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml/badge.svg)](https://github.com/basantech89/awesome-tools/actions/workflows/publish.yml)

## Table of Contents

- [Commitizen for multi or mono repo projects 🔥](#commitizen-for-multi-or-mono-repo-projects-)
	- [Table of Contents](#table-of-contents)
	- [Installation](#installation)
	- [Usage](#usage)
		- [cz.config.ts](#czconfigts)
		- [Things to know](#things-to-know)
	- [Issues](#issues)
		- [🐛 Bugs](#-bugs)
		- [💡 Feature Requests](#-feature-requests)
	- [Credits](#credits)

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev @awesome-tools/commitizen cz-git
```

## Usage

Then add a script to your `package.json`:

```json5
{
  "scripts": {
    "cm": "commitizen"
  }
}
```

You can now use this script with yarn or npm
```shell
yarn cm
```

OR
  
```shell
yarn commitizen
```

### cz.config.ts

You can optionally create a `cz.config.ts` file in the root of your project to customize the behavior of commitizen. Here is the configuration used in this monorepo as an example:

```ts
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { definePrompt } from 'cz-git'

function addSignedOffByTrailer(commitMessage: string) {
	try {
		const authorIdentity = execSync('git var GIT_AUTHOR_IDENT', {
			encoding: 'utf-8',
		}).trim()

		const sobLine = authorIdentity.replace(/^(.*>).*$/, 'Signed-off-by: $1')
		const modifiedMessage = execSync(
			`git interpret-trailers --if-missing add --trailer "${sobLine}"`,
			{ input: commitMessage, encoding: 'utf-8' },
		)

		return modifiedMessage.trim()
	} catch (error) {
		if (error instanceof Error) {
			console.error('Failed to add Signed-off-by trailer:', error.message)
		} else {
			console.error('Error', error)
		}

		return commitMessage
	}
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
const tools = fs.readdirSync(path.resolve(__dirname, 'tools'))

export const scopes = [
	{
		name: 'release',
	},
	{
		name: 'ci',
	},
	{
		name: 'test',
	},
	{
		name: 'core',
	},
	{
		name: 'tool',
	},
	{
		name: 'backend',
	},
	...[...packages, ...tools].map(name => ({ name })),
]

export const types = [
	{
		value: 'feat',
		name: '🎉 feat:\tAdding a new feature',
		emoji: '🎉',
	},
	{
		value: 'fix',
		name: '🐛 fix:\tFixing a bug',
		emoji: '🐛',
	},
	{
		value: 'hotfix',
		name: '🚑 hotfix:\tCritical hotfix',
		emoji: '🚑',
	},
	{
		value: 'docs',
		name: '🗃️ docs:\tAdd or update documentation',
		emoji: '🗃️',
	},
	{
		value: 'style',
		name: '💄 style:\tAdd or update styles, ui or ux',
		emoji: '💄',
	},
	{
		value: 'refactor',
		name: '♻️ refactor:\tCode change that neither fixes a bug nor adds a feature',
		emoji: '♻️',
	},
	{
		value: 'perf',
		name: '⚡️perf:\tCode change that improves performance',
		emoji: '⚡️',
	},
	{
		value: 'test',
		name: '🧪 test:\tAdding tests cases',
		emoji: '🧪',
	},
	{
		value: 'chore',
		name: '🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
		emoji: '🚚',
	},
	{
		value: 'revert',
		name: '💫 revert:\tRevert to a commit',
		emoji: '💫',
	},
	{
		value: 'wip',
		name: '🚧 wip:\tWork in progress',
		emoji: '🚧',
	},
	{
		value: 'build',
		name: '🦖 build:\tAdd or update regards to build process',
		emoji: '🦖',
	},
	{
		value: 'ci',
		name: '🚀 ci:\tFixing CI build',
		emoji: '🚀',
	},
	{
		value: 'security',
		name: '🚨 security:\tFixing security issues',
		emoji: '🚨',
	},
	{
		value: 'init',
		name: '✨ init:\tInitial commit',
		emoji: '✨',
	},
]

export default definePrompt({
	allowCustomScopes: false,
	allowEmptyScopes: false,
	allowBreakingChanges: ['feat', 'fix'],
	markBreakingChangeMode: true,
	minSubjectLength: 10,
	maxSubjectLength: 200,
	maxHeaderLength: 200,
	useEmoji: true,
	emojiAlign: 'left',
	enableMultipleScopes: true,
	useCommitSignGPG: true,
	scopeEnumSeparator: ',',
	formatMessageCB: ({ defaultMessage }) => {
		return addSignedOffByTrailer(defaultMessage)
	},
	types,
	scopes,
})
```

### Things to know

This project is a wrapper around `https://github.com/commitizen/cz-cli` for multi/mono repo projects and it uses the [cz-git](https://cz-git.qbb.sh/) adapter.

## Issues

_Looking to contribute? Look for the [Good First Issue](https://github.com/basantech89/awesome-tools/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
label._ 😀

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/basantech89/awesome-tools/issues)

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## Credits

This project wouldn't have been possible without the amazing work done by

[Commitizen](https://commitizen-tools.github.io/commitizen/)
[git-cz](https://cz-git.qbb.sh/)
