import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    {
        ignores: ["dist/**"]
    },
    {
        files: ["src/**/*.js"],
        plugins: {
            "@stylistic/js": stylisticJs
        },
        rules: {
            quotes: ["error", "single"],
            "object-curly-spacing": ["error", "never"],
            "semi": ["error", "always"]
        }
    }
];
