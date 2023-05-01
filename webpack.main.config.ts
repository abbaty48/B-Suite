import { rules } from './webpack.rules';
import type { Configuration } from 'webpack';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './app-main/index.ts',
  output: {
    // path: path.resolve(__dirname, '.app/app-main'),
    // publicPath: 'http://localhost:3001/v1/public/uploads/features/',
  },
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.svg'],
  },
};
