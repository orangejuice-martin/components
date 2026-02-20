const path = require("path")
const webpack = require("webpack")
const fs = require("fs")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const dist = path.join(__dirname, "./dist")

const getEntries = () =>
  fs
    .readdirSync(path.join(__dirname, "src/entries"))
    .reduce(
      (o, x) =>
        /\.tsx?/.test(x)
          ? { ...o, [x.substring(0, x.lastIndexOf("."))]: "./src/entries/" + x }
          : o,
      {}
    )

module.exports = (env, argv) => {
  const buildEnv = env.dev ? "DEV" : env.acc ? "ACC" : env.prod ? "PROD" : "DEV"
  const publicPath = "./dist/"

  const index = {
    entry: getEntries(),
    devtool:
      argv.mode === "production"
        ? undefined
        : "inline-source-map",
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[name].[contenthash].chunk.js",
      path: dist,
      publicPath,
      pathinfo: false,
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          type: "asset/source"
        },
        {
          test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|woff2)$/,
          type: "asset/resource",
          generator: {
            filename: "./assets/generated/[hash][ext][query]",
            publicPath
          }
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            ignoreDiagnostics: true,
            transpileOnly: true,
            experimentalWatchApi: true,
            experimentalFileCaching: true,
          },
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            { loader: "css-loader", options: { url: false } },
            { loader: "postcss-loader" },
            { loader: "sass-loader" },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "src"),
      },
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
        chunkFilename: "[name].[contenthash].chunk.css",
        ignoreOrder: false,
      }),
      new BundleAnalyzerPlugin({
        reportFilename: "app.result.html",
        analyzerMode: "static",
        openAnalyzer: false,
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin({
        "globalThis.DEV": JSON.stringify(argv.env.development),
        "globalThis.PUBLIC_PATH": JSON.stringify(publicPath),
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 50000,
        maxSize: 1000000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 2,
        cacheGroups: {
          default: false,
          common: false,
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true
          }
        },
      },
    },
  }

  return [index]
}