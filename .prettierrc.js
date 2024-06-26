/** @type {import("prettier").Config} */
export default {
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    endOfLine: "auto",
    printWidth: 300,
    overrides: [
        {
            files: ["**/*.yml", "**/*.md"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
