module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'standard',
		'prettier'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'no-use-before-define': 'error',
		'func-names': ['error', 'as-needed'],
		'vars-on-top': 'off',

		'no-console': 'off',
		eqeqeq: 'off',
		'no-nested-ternary': 'off',
		'no-underscore-dangle': 'off',
		'global-require': 'off',
		camelcase: 'off',
		'no-restricted-globals': 'off',
		'no-alert': 'off',
		'no-plusplus': 'off',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'no-undef': ['error', { typeof: true }]
	}
};
