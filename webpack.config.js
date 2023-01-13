const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const package = require("./package.json");

var devMode = process.env['NODE' + '_ENV'] !== 'production'
const CONFIG = {
    
    output: {
        libraryTarget: "umd",
        globalObject: this,
        library: package.name,
        name: "[name].[contenthash]",
        chunk: "[id].[contenthash]",
        dir: "dist" // Do not include './' or '/' 
    },
    input: {
        entry: './src/index.ts', // Typescript only
        dir: 'src'
    },
    
    // Manifesting and information
    
    // For site.webmanifest
    appName: 'Canvas Shape Background',
    shortAppName: 'Shapes',
    description: 'Canvas animation',
    colors: {
        background: '#3a3a3c',
        theme: '#272738' // also injected into html
    },
    favicon: 'favicon.ico', // Must be ends with .ico 
    icons: {
        src: path.resolve('src/assets/icon.png'),
        sizes: [96, 128, 192, 256, 384, 512],
    },
}

module.exports = function(env, config) {
    
    if(process.env['NODE' + '_ENV'] === void 0) {
        // From flag '--mode'
        devMode = config.mode !== "production";
    }
    
    console.log("DEV MODE: " + String(devMode) + "\n")
    
    if(devMode) {
        CONFIG.output.name = "[name]";
        CONFIG.output.chunk = "[id]";
    }
    
    return {
        entry: CONFIG.input.entry,
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }, {
                test: /\.(jpe?g|png|gif|svg|webp|webg)$/i,
                loader: "file-loader"
            }, {
                test: /\.(woff|ttf|otf|eot|woff2)$/i,
                loader: "file-loader"
            }, {
                test: /\.(wav|mp3|mp4|avi)$/i,
                loader: "file-loader"
            }, {
                test: /\.((s[ca]|c)ss)$/,
                exclude: /node_modules/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "sass-loader",
                ],
            }]
        },
        
        resolve: {
            extensions: ['.ts', '.tsx', 'scss', 'sass', 'css']
        },
        
        output: {
            filename:  CONFIG.output.name + ".js",
            chunkFilename: CONFIG.output.chunk + ".js",
            path: path.resolve(__dirname, './' + CONFIG.output.dir),
            clean: true
        },
        
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                server: {
                    baseDir: [CONFIG.output.dir]
                },

                files: ['./' + CONFIG.output.dir + '/*'],
                notify: false, 
                ui: false, // Web UI for BrowserSyncPlugin
                open:false // Open browser after initiation

            }),
                
            new HtmlWebpackPlugin({
                filename: 'index.html',
                favicon: './' + path.join(CONFIG.input.dir, CONFIG.favicon),
                template: './' + path.join(CONFIG.input.dir, 'index.html'),
             //   manifest: './src/site.webmanifest',
                showErrors: devMode, // Include html error on emitted file
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                    robots: 'index,follow',
                    referrer: 'origin',
                    charset: { charset: 'UTF-8' },
                    'http-equiv': {
                        'http-equiv': 'Content-Type',
                        content: 'text/html; charset=UTF-8'
                    },
                    'color-scheme': 'light dark'
                }
            }),
            
            new MiniCssExtractPlugin({
                filename: CONFIG.output.name + ".css",
                chunkFilename: CONFIG.output.chunk + ".css",
            }),
            
            new WebpackPwaManifest({
                name: CONFIG.appName,
                short_name: CONFIG.shortAppName,
                description: CONFIG.description,
                orientation: "portrait",
                start_url: ".",
                background_color: CONFIG.colors.background,
                theme_color: CONFIG.colors.theme,
                icons: [{
                    src: CONFIG.icons.src,
                    sizes: CONFIG.icons.sizes,
                    purpose: "any maskable"
                }],
                
                // Asset config
                fingerprints: false, // Remove hashed in filename
                publicPath: './', // Make sure the url starts with 
                inject: true, // Insert html tag <link rel="manifest" ... />
                filename: 'site.webmanifest'
            }),
        ]
    }
}