import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
	extends: ['gitmoji'],
	rules: {
		'subject-max-length': [RuleConfigSeverity.Error, 'always', 100],
		'scope-empty': [RuleConfigSeverity.Error, 'never'],
		'header-max-length': [RuleConfigSeverity.Error, 'always', 200],
		'type-enum': [
			RuleConfigSeverity.Error,
			'always',
			[
				'feat',
				'fix',
				'hotfix',
				'docs',
				'style',
				'refactor',
				'perf',
				'test',
				'chore',
				'revert',
				'wip',
				'build',
				'ci',
				'security',
				'init',
			],
		],
		'scope-enum': [
			RuleConfigSeverity.Error,
			'always',
			['ui', 'ci', 'test', 'core', 'tool', 'backend'],
		],
	},
}

export default Configuration
