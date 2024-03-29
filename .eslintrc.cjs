module.exports = {
  root: true,
  extends: [
    "ponko2",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // React
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
    // ----------------------------------------------

    // Enforce a specific function type for function components
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "function-expression"],
        unnamedComponents: "function-expression",
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:import/typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/stylistic",
        "prettier",
      ],
      rules: {
        // React
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md
        // ----------------------------------------------

        // Disallow missing props validation in a React component definition
        "react/prop-types": "off",

        // TypeScript
        // https://typescript-eslint.io/rules/
        // ----------------------------------------------

        // Enforce type definitions to consistently use either `interface` or `type`
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],

        // Disallow variable declarations from shadowing variables declared in the outer scope
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",

        // Disallow unused variables
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { vars: "all", args: "after-used", ignoreRestSiblings: true },
        ],

        // Disallow the use of variables before they are defined
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, classes: true },
        ],
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      excludedFiles: ["jest.config.ts", "jest.setup.ts", "vite.config.ts"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
      ],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      rules: {
        // TypeScript
        // https://typescript-eslint.io/rules/
        // ----------------------------------------------

        // Enforce consistent usage of type imports
        "@typescript-eslint/consistent-type-imports": "error",

        // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
        "@typescript-eslint/no-import-type-side-effects": "error",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      extends: [
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:testing-library/react",
        "prettier",
      ],
      rules: {
        "jest/consistent-test-it": "error",
        "jest/no-conditional-in-test": "error",
        "jest/no-duplicate-hooks": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-called-with": "error",
        "jest/prefer-comparison-matcher": "error",
        "jest/prefer-equality-matcher": "error",
        "jest/prefer-expect-resolves": "error",
        "jest/prefer-hooks-on-top": "error",
        "jest/prefer-spy-on": "error",
        "jest/prefer-strict-equal": "error",
        "jest/prefer-todo": "error",
        "jest/require-hook": "error",
        "jest/require-top-level-describe": "error",
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      extends: ["plugin:storybook/recommended"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
    {
      files: ["jest.config.ts", "vite.config.ts"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
  ],
};
