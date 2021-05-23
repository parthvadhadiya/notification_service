module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['google'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { code: 140 }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'require-jsdoc': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'arrow-parens': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    'no-undef': 'error',
    'no-const-assign': 'error',
    'operator-linebreak': 'off',
  },
};
