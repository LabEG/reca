module.exports = {
    extends: ["./node_modules/@labeg/code-style/.eslintrc.js"],
    ignorePatterns: ["node_modules/*", "dist/*"],
    rules:{
        // override here
        "@typescript-eslint/parameter-properties": [
            2,
            {
              "allow": ["private readonly", "public readonly"]
            }
        ]
    }
};
