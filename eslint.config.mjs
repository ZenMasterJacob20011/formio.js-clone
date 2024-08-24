import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'
import jsdoc from 'eslint-plugin-jsdoc'
import sortClassMembers from "eslint-plugin-sort-class-members";

export default [
    sortClassMembers.configs['flat/recommended'],
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
            "sort-class-members/sort-class-members": [
                2,
                {
                    "order": [
                        "[static-properties]",
                        "[static-methods]",
                        "constructor",
                        "[accessor-pairs]",
                        "[methods]",
                        "[everything-else]"
                    ],
                    "accessorPairPositioning": "getThenSet",
                }
            ]
        }
    }
];
