module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },

  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === "production" ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === "production" ? 'error' : 'off',
    'linebreak-style': 'off',
    'semi': ['off', 'always'],
    'quotes': ['off', 'double'],
    'operator-linebreak': 0
  },
  parserOptions: {
    parse: 'babel-eslint'
  },
}
