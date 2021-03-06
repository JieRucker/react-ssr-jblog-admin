module.exports = {
    presets: [
        ["@babel/preset-env", {"modules": false}],
        "@babel/preset-react"
    ],
    plugins: [
        "@loadable/babel-plugin",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
}
