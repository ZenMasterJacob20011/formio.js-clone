import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    jsdoc.configs["flat/recommended-error"],
    {
        ignores: ["dist/**"]
    },
    {
        files: ["src/**/*.js"],
        plugins: {
            "@stylistic/js": stylisticJs,
        },
        rules: {
            quotes: ["error", "single"],
            "object-curly-spacing": ["error", "never"],
            "semi": ["error", "always"],
        }
    }
];
