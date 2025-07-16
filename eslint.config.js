import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
    },
    rules: {
      "prefer-const": "error",
      "no-restricted-syntax": ["error"],
      "lines-between-class-members": "off",
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: { consistent: true },
          ObjectPattern: { multiline: true },
          ImportDeclaration: "never",
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  // Ignore markdown files
  {
    ignores: ["**/*.md"],
  },
];
