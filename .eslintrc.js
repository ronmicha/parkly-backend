module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    semi: "error",
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
