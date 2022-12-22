module.exports = {
    secret:"SECRET_KEY_RANDOM"
}

// babel.config.js
module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow',
    ],
    plugins: [
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-class-properties',
    ]
}