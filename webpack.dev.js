import path from 'path'
const __dirname = import.meta.dirname
export default {
    entry: {
        "main": './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'formio.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
    ,
    mode: 'development'
}
