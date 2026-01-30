import { execSync } from 'node:child_process'
import { glob, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { definePrompt } from 'cz-git'

function addSignedOffByTrailer(commitMessage: string) {
	try {
		const authorIdentity = execSync('git var GIT_AUTHOR_IDENT', {
			encoding: 'utf-8'
		}).trim()

		const sobLine = authorIdentity.replace(/^(.*>).*$/, 'Signed-off-by: $1')
		const modifiedMessage = execSync(
			`git interpret-trailers --if-missing add --trailer "${sobLine}"`,
			{ input: commitMessage, encoding: 'utf-8' }
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

async function readJsonFile(filePath: string) {
	const data = await readFile(filePath, 'utf-8')
	return JSON.parse(data)
}

const rootPkgJson = await readJsonFile(path.join(__dirname, './package.json'))
const workspaces: string[] = rootPkgJson.workspaces || []
const packages = []

for await (const workspace of glob(workspaces)) {
	const packageJsonPath = path.join(__dirname, workspace, 'package.json')
	const json = await readJsonFile(packageJsonPath)
	if (json?.nx?.name) {
		packages.push(json.nx.name)
	}
}

export const scopes = [
	{
		name: 'release'
	},
	{
		name: 'ci'
	},
	{
		name: 'test'
	},
	{
		name: 'core'
	},
	{
		name: 'tools'
	},
	{
		name: 'backend'
	},
	...packages.map(name => ({ name }))
]

export const types = [
	{
		value: 'feat',
		name: '🎉 feat:\tAdding a new feature',
		emoji: '🎉'
	},
	{
		value: 'fix',
		name: '🐛 fix:\tFixing a bug',
		emoji: '🐛'
	},
	{
		value: 'hotfix',
		name: '🚑️hotfix:\tCritical hotfix',
		emoji: '🚑️'
	},
	{
		value: 'docs',
		name: '🗃️ docs:\tAdd or update documentation',
		emoji: '🗃️'
	},
	{
		value: 'style',
		name: '💄 style:\tAdd or update styles, ui or ux',
		emoji: '💄'
	},
	{
		value: 'refactor',
		name: '♻️ refactor:\tCode change that neither fixes a bug nor adds a feature',
		emoji: '♻️'
	},
	{
		value: 'perf',
		name: '⚡️perf:\tCode change that improves performance',
		emoji: '⚡️'
	},
	{
		value: 'test',
		name: '🧪 test:\tAdding tests cases',
		emoji: '🧪'
	},
	{
		value: 'chore',
		name: '🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
		emoji: '🚚'
	},
	{
		value: 'revert',
		name: '💫 revert:\tRevert to a commit',
		emoji: '💫'
	},
	{
		value: 'wip',
		name: '🚧 wip:\tWork in progress',
		emoji: '🚧'
	},
	{
		value: 'build',
		name: '🦖 build:\tAdd or update regards to build process',
		emoji: '🦖'
	},
	{
		value: 'ci',
		name: '🚀 ci:\tFixing CI build',
		emoji: '🚀'
	},
	{
		value: 'security',
		name: '🚨 security:\tFixing security issues',
		emoji: '🚨'
	},
	{
		value: 'init',
		name: '✨ init:\tInitial commit',
		emoji: '✨'
	}
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
	scopes
})
