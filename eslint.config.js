import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  // ✅ Node.js global variables
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },

  // ✅ JSX / React support
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
        import: 'readonly', // required for import.meta.env support
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

  // ✅ API folder (Node.js environment)
  {
    files: ['frontend/api/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        process: 'readonly',
        import: 'readonly', // required for import.meta.env support
      },
    },
  },

  // ✅ General JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        import: 'readonly', // required for import.meta.env support
      },
    },
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^React$' }],
    },
  },

  // ✅ CommonJS override
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },
];

