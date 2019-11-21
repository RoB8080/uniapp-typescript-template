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
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'space-before-function-paren': [2, 'never'],
        indent: ['warn', 4],
        'vue/html-closing-bracket-newline': ['error', {
            singleline: 'never',
            multiline: 'never'
        }],
        'vue/array-bracket-spacing': 'error',
        'vue/html-indent': ['warn', 4],
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
