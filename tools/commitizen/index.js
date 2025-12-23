#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { bootstrap } from 'commitizen/dist/cli/git-cz.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

bootstrap({
	cliPath: __dirname,
	config: {
		path: path.join(__dirname, 'node_modules/cz-git'),
	},
})
