module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		semi: ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto'
			}
		]
	}
}
