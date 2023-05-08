import { ExternalsPlugin, DefinePlugin } from 'webpack';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ExternalsPlugin('commonjs', ['electron']),
  // to be able to use 'config' package, this need to be set
  new DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
];
