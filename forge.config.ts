import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: `default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src app: * 'self' 'unsafe-inline' blob: data: gap:; connect-src app: * self 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;`,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './app-ui/index.html',
            js: './app-ui/index.tsx',
            // name: 'main_window',
            name: 'B-Suite',
            preload: {
              js: './app-main/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
