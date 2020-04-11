module.exports = {
  root: true,
  extends: [
    "ponko2",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  rules: {
    // Import
    // https://github.com/benmosher/eslint-plugin-import/blob/master/README.md
    // ----------------------------------------------

    // Prohibit default exports
    "import/no-default-export": "error",

    // TypeScript
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    // ----------------------------------------------

    // enforce camelCase naming convention
    camelcase: "off",
    "@typescript-eslint/camelcase": [
      "error",
      { properties: "never", ignoreDestructuring: false },
    ],

    // require explicit return types on functions and class methods
    "@typescript-eslint/explicit-function-return-type": "off",

    // disallow usage of the any type
    "@typescript-eslint/no-explicit-any": "off",

    // disallow unused variables
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: true },
    ],

    // disallow the use of variables before they are defined
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true },
    ],
  },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      rules: {
        "jest/consistent-test-it": "error",
        "jest/no-duplicate-hooks": "error",
        "jest/no-if": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-called-with": "error",
        "jest/prefer-hooks-on-top": "error",
        "jest/prefer-spy-on": "error",
        "jest/prefer-strict-equal": "error",
        "jest/prefer-todo": "error",
        "jest/require-top-level-describe": "error",
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
