/**
 * ESLint Configuration File (ESLint v9+ format)
 */
module.exports = [
  {
    // Apply these rules to all JavaScript files
    files: ["**/*.js"],

    // Basic language options
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        // Node.js globals
        process: "readonly",
        console: "readonly",
        require: "readonly",
        module: "writable",
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        // ES6 globals
        Promise: "readonly",
        Map: "readonly",
        Set: "readonly",
      },
    },

    // Basic rules (minimal set)
    rules: {
      // Error prevention
      "no-undef": "error",
      "no-unused-vars": "warn",
      "no-console": "off", // Allow console in this project

      // Style consistency (minimal)
      semi: ["warn", "always"],
      quotes: ["warn", "single", { allowTemplateLiterals: true }],
      indent: ["warn", 2],
      "comma-dangle": ["warn", "only-multiline"],
    },
  },

  // Special configuration for test files
  {
    files: [
      "**/test/**/*.js",
      "**/*.test.js",
      "**/*.spec.js",
      "**/auth-test.js",
    ],
    rules: {
      // Relax rules for test files
      "no-unused-vars": "off",
      "no-undef": "warn",
    },
  },
];
