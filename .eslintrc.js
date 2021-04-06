module.exports = {
  extends: [
    'eslint-config-qiwi',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'unicorn/no-null': 0,
    'simple-import-sort/imports': 0,
    'unicorn/no-useless-undefined': 0,
  }
};
