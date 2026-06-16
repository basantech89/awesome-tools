import {
	addDependenciesToPackageJson,
	formatFiles,
	generateFiles,
	getPackageManagerCommand,
	OverwriteStrategy,
	readJson,
	removeDependenciesFromPackageJson,
	type Tree,
	updateJson
} from '@nx/devkit'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { AwesomeToolsGeneratorSchema } from './schema.ts'

const getDependencyVersions = async (dependencies: string[]) => {
	return dependencies.reduce(
		(acc, dep) => {
			acc[dep] = 'latest'
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
		'tailwind-variants',
		'@dnd-kit/abstract',
		'@dnd-kit/dom',
		'@dnd-kit/helpers',
		'@dnd-kit/react',
		'@tanstack/react-table',
		'date-fns',
		'react-day-picker',
		'sonner',
		'zod'
	]

	const devDependencies = [
		'@awesome-tools/oxlint',
		'@awesome-tools/commitizen',
		'cz-git',
		'@commitlint/cli',
		'@commitlint/config-conventional',
		'@commitlint/types',
		'commitlint-config-gitmoji',
		'husky',
		'all-contributors-cli',
		'oxlint',
		'oxfmt',
		'@types/node'
	]

	const filename = fileURLToPath(import.meta.url)
	const dirname = path.dirname(filename)

	const depVersions = await getDependencyVersions(dependencies)
	const devDepVersions = await getDependencyVersions(devDependencies)

	removeDependenciesFromPackageJson(tree, [], ['@types/node'])
	addDependenciesToPackageJson(tree, depVersions, devDepVersions)

	const pkgJson = readJson(tree, 'package.json')
	const rootPackage = pkgJson?.nx?.name || pkgJson.name

	updateJson(tree, 'package.json', pkgJson => {
		pkgJson.scripts = {
			...pkgJson.scripts,
			prepare: 'husky',
			'contributors:init': 'all-contributors init',
			'contributors:add': 'all-contributors add',
			'contributors:generate': 'all-contributors generate',
			format: 'bun oxfmt',
			'format:check': 'bun oxfmt --check',
			validate: `nx run-many -t format lint test typecheck build --exclude=${rootPackage}`,
			'validate:affected': `nx affected -t format lint test typecheck build --tui false --exclude=${rootPackage}`,
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
		path.join(dirname, 'files'),
		projectRoot,
		resolvedOptions,
		generateOptions
	)

	if (pm === 'bun') {
		generateFiles(
			tree,
			path.join(dirname, 'bun-files'),
			projectRoot,
			resolvedOptions,
			generateOptions
		)
	}

	await formatFiles(tree)
}

export default toolsGenerator
