const path = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin"),
  { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity"),
  webpack = require("webpack"),
  packageJson = require("./package.json");
module.exports = {
  mode: "production",
  entry: "./src/pages/_document.tsx",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    filename: `prossaude_bundle.${packageJson.version}.[contenthash].min.js`,
    path: path.resolve(__dirname, "../docs"),
    publicPath: "",
    crossOriginLoading: "anonymous",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: "react-jsx",
              },
            },
          },
          {
            loader: "string-replace-loader",
            options: {
              search: 'src: "/images/',
              replace: 'src: "images/',
              flags: "g",
            },
          },
        ],
        exclude: [/node_modules/, /vite.config.ts/, /vite.config.js/, /wpBanned.scss/],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true,
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: /"\/images\//g,
        replacement: "images/",
      },
    ]),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/images", to: "/images" },
        { from: "public/browserConfig.xml", to: "browserConfig.xml" },
      ],
    }),
    new SubresourceIntegrityPlugin({
      hashFuncNames: ["sha384"],
      enabled: true,
    }),
    new MiniCssExtractPlugin({
      filename: `prossaude_styles.${packageJson.version}.[contenthash].min.css`,
    }),
  ],
};
