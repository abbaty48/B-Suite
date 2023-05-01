import type { ModuleOptions } from 'webpack';

export const rules: Required<ModuleOptions>['rules'] = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.ts(x?)$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.(woff2|eot|ttf)$/,
    loader: 'url-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 20 * 1024, // 20Kb
        outputPath: '/',
        publicPath: '/src/assets/imgs',
        name: '[path][name].[ext]',
        esModule: false,
      },
    },
  },
  {
    test: /\.(ico|icns)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
  {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader'],
  },
];
