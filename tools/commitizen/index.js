#!/usr/bin/env node

import { bootstrap } from 'commitizen/dist/cli/git-cz.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

bootstrap({
	cliPath: dirname,
	config: {
		path: 'cz-git'
	}
})
