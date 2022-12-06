export enum ConfigType {
	SHORT_TEXT = 'SHORT_TEXT',
	LONG_TEXT = 'LONG_TEXT',
	EMAIL = 'EMAIL',
	NUMBER = 'NUMBER',
	INTEGER = 'INTEGER',
	CHECKBOX = 'CHECKBOX',
	DICTIONARY = 'DICTIONARY',
	OAUTH2 = 'OAUTH2',
	DROPDOWN = 'DROPDOWN',
}

export const configTypesDropdownOptions = [
	{
		label: 'Short Text',
		value: ConfigType.SHORT_TEXT,
		icon: 'short-text.svg',
		group: 'Text',
	},
	{
		label: 'Multiline Text',
		value: ConfigType.LONG_TEXT,
		icon: 'multiline-text.svg',
		group: 'Text',
	},

	{
		label: 'OAuth 2.0',
		value: 'OAUTH2',
		icon: 'wire.svg',
		group: 'Authentication',
	},

	{ label: 'Integer', value: ConfigType.INTEGER, icon: 'number.svg', group: 'Number' },
	{
		label: 'Checkbox',
		value: ConfigType.CHECKBOX,
		icon: 'toggle.svg',
		group: 'Boolean',
	},
	{
		label: 'Dictionary',
		value: ConfigType.DICTIONARY,
		icon: 'key-value.svg',
		group: 'Others',
	},
	{
		label: 'Dropdown',
		value: ConfigType.DROPDOWN,
		icon: 'dropdown.svg',
		group: 'Others',
	},
];