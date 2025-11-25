#!/usr/bin/env node

const path = require('node:path')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap

bootstrap({
	cliPath: __dirname,
	config: {
		path: path.join(__dirname, 'node_modules/cz-git'),
	},
})
