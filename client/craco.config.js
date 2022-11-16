/* craco.config.js */
const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "@components": path.resolve(__dirname, 'src/components'),
            "@assets": path.resolve(__dirname, 'src/assets'),
            "@utils": path.resolve(__dirname, 'src/utils'),
            "@hooks": path.resolve(__dirname, 'src/hooks'),
            "@pages": path.resolve(__dirname, 'src/pages'),
            "@services": path.resolve(__dirname, 'src/services'),
            "@plugins": path.resolve(__dirname, 'src/plugins'),
            "@config": path.resolve(__dirname, 'src/config'),
            "@constants": path.resolve(__dirname, 'src/constants'),
            "@redux": path.resolve(__dirname, 'src/redux')
        }
    },
    plugins: {
        entry: {
            main: './src/ForbiddenPage.tsx',
            'pdf.worker': path.join(__dirname, './node_modules/pdfjs-dist/build/pdf.worker.js'),
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].bundle.js'
        }
    }
};