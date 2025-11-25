import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

import { scopes, types } from './cz.config'

const Configuration: UserConfig = {
	extends: ['gitmoji'],
	prompt: {
		settings: {
			enableMultipleScopes: true,
			scopeEnumSeparator: ',',
		},
	},
	rules: {
		'subject-max-length': [RuleConfigSeverity.Error, 'always', 200],
		'scope-empty': [RuleConfigSeverity.Error, 'never'],
		'trailer-exists': [RuleConfigSeverity.Error, 'always', 'Signed-off-by:'],
		'header-max-length': [RuleConfigSeverity.Error, 'always', 200],
		'type-enum': [RuleConfigSeverity.Error, 'always', types.map(t => t.value)],
		'scope-enum': [RuleConfigSeverity.Error, 'always', scopes.map(s => s.name)],
	},
}

export default Configuration
