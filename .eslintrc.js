module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/recommended'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': false,
    'vue/multiline-html-element-content-newline': false,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
