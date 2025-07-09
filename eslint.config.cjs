const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

// ✅ JSX support
const babelParser = require('@babel/eslint-parser');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  // ✅ Base config for JS files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly', // ✅ Fixes "process is not defined"
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    },
  },

  // ✅ Override for CJS (like hardhat.config.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },
  },

  // ✅ TypeScript support (optional)
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Path to the tsconfig
        tsconfigRootDir: __dirname, // Ensure relative resolution from root
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  // ✅ JSX/React support for .jsx files
  {
    files: ['**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'warn',
    },
  },
  
  // ✅ Node.js global support for API files
  {
    files: ['frontend/api/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // 👈 Adds support for `process`, `__dirname`, etc.
      },
    },
  },

  // ✅ Ignore generated files
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'typechain-types/**',
      'artifacts/**',
      'artifacts-zk/**',
      'cache/**',
    ],
  },
];

