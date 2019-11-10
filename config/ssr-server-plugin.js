const {red} = require("chalk");
const isJS = (file) => /\.js(\?[^.]+)?$/.test(file);

const onEmit = (compiler, name, hook) => {
    if (compiler.hooks) {
        // Webpack >= 4.0.0
        compiler.hooks.emit.tapAsync(name, hook)
    } else {
        // Webpack < 4.0.0
        compiler.plugin("emit", hook)
    }
};

const validateConfig = (compiler) => {
    const prefix = "ssr-server-plugin";
    if (compiler.options.target !== "node") {
        let msg = 'webpack config `target` should be "node".';
        console.error(red(`${prefix} ${msg}\n`));
    }

    if (compiler.options.output && compiler.options.output.libraryTarget !== "commonjs2") {
        let msg = 'webpack config `output.libraryTarget` should be "commonjs2".';
        console.error(red(`${prefix} ${msg}\n`));
    }

    if (!compiler.options.externals) {
        let msg = 'You should use `output.externals` to externalize dependencies in the server build'
        console.error(red(`${prefix} ${msg}\n`));
    }
};

module.exports = class SSRServerPlugin {
    constructor(opts = {}) {
        this.options = Object.assign({
            filename: "server-bundle.json",
        }, opts);
    }

    apply(compiler) {
        validateConfig(compiler);

        onEmit(compiler, "ssr-server-plugin", (compilation, callback) => {
            const stats = compilation.getStats().toJson();

            if (Object.keys(stats.entrypoints).length > 1) {
                throw new Error(
                    "Server-side bundle should have one single entry file. "
                );
            }

            const entryName = Object.keys(stats.entrypoints)[0];
            const entryInfo = stats.entrypoints[entryName];

            if (!entryInfo) {
                return callback();
            }

            const entryAssets = entryInfo.assets.filter(isJS);
            const entry = entryAssets[0];

            const bundle = {
                entry,
                files: {},
                maps: {}
            }

            stats.assets.forEach(asset => {
                if (asset.name.match(/\.js$/)) {
                    bundle.files[asset.name] = compilation.assets[asset.name].source();
                } else if (asset.name.match(/\.js\.map$/)) {
                    bundle.maps[asset.name.replace(/\.map$/, "")] = JSON.parse(compilation.assets[asset.name].source());
                }
                // do not emit anything else for server
                delete compilation.assets[asset.name];
            })

            if (Object.keys(bundle.files).length > 1) {
                throw new Error(
                    "Server-side bundle should output one single file. " +
                    "If you are using code splitting, you should use `dynamic-import-node` babel plugin. "
                );
            }

            const json = JSON.stringify(bundle, null, 2)
            const filename = this.options.filename

            compilation.assets[filename] = {
                source: () => json,
                size: () => json.length
            }

            callback();
        });
    }
}