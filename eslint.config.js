import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/explicit-function-return-type": "off",
            "no-console": ["warn", { allow: ["error", "warn"] }],
        },
    },
    prettierConfig,
    {
        ignores: ["dist/", "node_modules/", "prisma/migrations/", "generated/"],
    },
);
