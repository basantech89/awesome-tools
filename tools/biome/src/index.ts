import { dirname } from 'node:path'
import {
	type CreateNodesResult,
	type CreateNodesV2,
	createNodesFromFiles,
} from '@nx/devkit'

type MyPluginOptions = Record<string, never>

export const createNodesV2: CreateNodesV2<MyPluginOptions> = [
	'**/package.json',
	async (configFiles, options, context) => {
		return await createNodesFromFiles(
			createNodesInternal,
			configFiles,
			options,
			context,
		)
	},
]

async function createNodesInternal(
	configFilePath: string,
): Promise<CreateNodesResult> {
	const root = dirname(configFilePath)

	// Project configuration to be merged into the rest of the Nx configuration
	return {
		projects: {
			[root]: {
				metadata: {
					description: 'NX plugin for Biome',
				},
				targets: {
					lint: {
						// Nx target syntax to execute a command. More on {projectRoot} below
						command: 'bun biome lint {projectRoot}',
						cache: true,
						inputs: [
							'default',
							'^default',
							'{workspaceRoot}/biome.json',
							{
								externalDependencies: ['@biomejs/biome'],
							},
						],
					},
				},
			},
		},
	}
}
