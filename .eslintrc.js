module.exports = {
  root: true,
  extends: [
    'ponko2',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    // Import
    // https://github.com/benmosher/eslint-plugin-import/blob/master/README.md
    // ----------------------------------------------

    // Prohibit default exports
    'import/no-default-export': 'error',

    // TypeScript
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    // ----------------------------------------------

    // Require explicit return types on functions and class methods
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Require explicit return and argument types on exported functions' and classes' public class methods
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Disallow usage of the any type
    '@typescript-eslint/no-explicit-any': 'off',

    // Disallow unused variables
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // Disallow variable declarations from shadowing variables declared in the outer scope
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // Disallow the use of variables before they are defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'react-app/jest',
      ],
      rules: {
        'jest/consistent-test-it': 'error',
        'jest/no-duplicate-hooks': 'error',
        'jest/no-if': 'error',
        'jest/no-test-return-statement': 'error',
        'jest/prefer-called-with': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-spy-on': 'error',
        'jest/prefer-strict-equal': 'error',
        'jest/prefer-todo': 'error',
        'jest/require-top-level-describe': 'error',
      },
    },
    {
      files: ['*.stories.ts', '*.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
