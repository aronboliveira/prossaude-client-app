module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    es6: true,
  },
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
      impliedStrict: true,
    },
  },
  rules: {
    "no-cond-assign": "error",
    "no-with": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "warn",
    "no-unsafe-finally": "error",
    "no-unreachable": "error",
    "no-invalid-this": "error",
    "no-invalid-regexp": "error",
    "no-fallthrough": "error",
    "no-extra-semi": "error",
    "no-dupe-args": "error",
    "valid-typeof": "error",
    "no-compare-neg-zero": "error",
    "prefer-spread": "warn",
    "no-ternary": "off",
    "no-case-declarations": "off",
    "no-unused-labels": "warn",
    "no-useless-computed-key": "warn",
    "no-undef-init": "warn",
    "no-regex-spaces": "warn",
    "no-inline-comments": "off",
    "no-implicit-coercion": "warn",
    "no-eq-null": "warn",
    "no-console": "off",
    "no-prototype-builtins": "off",
    yoda: "warn",
    eqeqeq: "error",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "prefer-template": "off",
    strict: "warn",
    "spaced-comment": "off",
    "block-scoped-var": "warn",
    "vars-on-top": "warn",
    "no-unused-vars": "off",
    "no-var": "warn",
    "prefer-const": "warn",
    "require-await": "warn",
    semi: "warn",
    "comma-dangle": "off",
    "no-useless-return": "warn",
    "prefer-rest-params": "warn",
    "space-in-parens": "off",
    "rest-spread-spacing": "off",
    "no-trailing-spaces": "warn",
    "arrow-spacing": "warn",
    "object-curly-spacing": "off",
    "key-spacing": "warn",
    "array-bracket-spacing": "warn",
    "array-bracket-newline": "off",
    "space-before-function-paren": "off",
    "no-unexpected-multiline": "warn",
    "use-isnan": "warn",
    "template-tag-spacing": "warn",
    "no-template-curly-in-string": "warn",
    "switch-colon-spacing": "warn",
    "no-restricted-globals": "off",
    "react/no-unescaped-entities": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "off",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/semi": "warn",
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
  },
};
if (process.env.NODE_ENV === "production") {
  module.exports.rules["no-console"] = "off";
  module.exports.rules["no-useless-escape"] = "off";
  module.exports.rules["no-unused-vars"] = "off";
  module.exports.rules["no-useless-return"] = "off";
  module.exports.rules["require-await"] = "off";
  module.exports.rules["prefer-const"] = "off";
  module.exports.rules["vars-on-top"] = "off";
  module.exports.rules["no-var"] = "off";
  module.exports.rules["@typescript-eslint/no-unused-vars"] = "off";
  module.exports.rules["@typescript-eslint/explicit-function-return-type"] = "off";
}
