import { exec } from 'node:child_process'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as util from 'node:util'
import {
	addDependenciesToPackageJson,
	formatFiles,
	generateFiles,
	getPackageManagerCommand,
	OverwriteStrategy,
	removeDependenciesFromPackageJson,
	type Tree,
	updateJson
} from '@nx/devkit'

import type { AwesomeToolsGeneratorSchema } from './schema.ts'

const asyncExec = util.promisify(exec)

const getPackageVersion = async (name: string) => {
	const { stdout, stderr } = await asyncExec(`npm view ${name} version`)

	if (stderr) {
		throw new Error(
			`Stderr while fetching version for package ${name}: ${stderr}`
		)
	}

	return { name, version: stdout.trim() }
}

const getDependencyVersions = async (dependencies: string[]) => {
	const dependencyVersions = await Promise.all(
		dependencies.map(getPackageVersion)
	)

	return dependencyVersions.reduce(
		(acc, curr) => {
			acc[curr.name] = curr.version
			return acc
		},
		{} as Record<string, string>
	)
}

export async function toolsGenerator(
	tree: Tree,
	options: AwesomeToolsGeneratorSchema
) {
	const dependencies = [
		'@awesome-tools/ui',
		'@awesome-tools/ui-blocks',
		'@awesome-tools/utils',
		'tailwindcss',
		'tailwind-merge',
		'tailwind-variants'
	]

	const devDependencies = [
		'@awesome-tools/biome',
		'@awesome-tools/commitizen',
		'cz-git',
		'@commitlint/cli',
		'@commitlint/config-conventional',
		'@commitlint/types',
		'commitlint-config-gitmoji',
		'husky',
		'all-contributors-cli',
		'@types/node'
	]

	const __filename = fileURLToPath(import.meta.url)
	const __dirname = path.dirname(__filename)

	const depVersions = await getDependencyVersions(dependencies)
	const devDepVersions = await getDependencyVersions(devDependencies)

	removeDependenciesFromPackageJson(tree, [], ['@types/node'])
	addDependenciesToPackageJson(tree, depVersions, devDepVersions)

	updateJson(tree, 'package.json', pkgJson => {
		pkgJson.scripts = {
			...pkgJson.scripts,
			prepare: 'husky',
			'contributors:init': 'all-contributors init',
			'contributors:add': 'all-contributors add',
			'contributors:generate': 'all-contributors generate',
			validate: 'nx run-many -t lint test typecheck build',
			'validate:affected':
				'nx affected -t lint test typecheck build --tui false',
			release: 'nx release --first-release --skip-publish'
		}

		return pkgJson
	})

	const projectRoot = './'

	const { exec, dlx } = getPackageManagerCommand()
	const pm = exec.split(' ')[0].trim()
	if (!pm) {
		throw new Error('Could not determine package manager.')
	}

	const resolvedOptions = { ...options, pm, dlx }

	const generateOptions = {
		overwriteStrategy: options.force
			? OverwriteStrategy.Overwrite
			: OverwriteStrategy.ThrowIfExisting
	}

	generateFiles(
		tree,
		path.join(__dirname, 'files'),
		projectRoot,
		resolvedOptions,
		generateOptions
	)

	if (pm === 'bun') {
		generateFiles(
			tree,
			path.join(__dirname, 'bun-files'),
			projectRoot,
			resolvedOptions,
			generateOptions
		)
	}

	await formatFiles(tree)
}

export default toolsGenerator
