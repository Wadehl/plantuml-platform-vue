module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'love',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  }
};
