module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'eslint:recommended',
        'plugin:vue/recommended',
        '@vue/standard',
        '@vue/typescript'
    ],
    rules: {
        'array-callback-return': 'error',
        'curly': 'error',
        'eqeqeq': 'error',
        'no-useless-return': 'error',
        'indent': ['error', 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-trailing-spaces': ['error', { 'ignoreComments': true }],
        'space-before-function-paren': [2, 'never'],
        'prefer-destructuring': ['warn', { 'object': true, 'array': false }],
        'prefer-const': 'warn',
        'vue/array-bracket-spacing': 'error',
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }],
        'vue/html-indent': ['error', 4],
        'vue/arrow-spacing': 'error',
        'vue/block-spacing': 'error',
        'vue/brace-style': 'error',
        'vue/camelcase': 'error',
        'vue/comma-dangle': 'error',
        'vue/component-name-in-template-casing': 'error',
        'vue/eqeqeq': 'error',
        'vue/key-spacing': 'error',
        'vue/match-component-file-name': 'error',
        'vue/object-curly-spacing': 'error'
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}
