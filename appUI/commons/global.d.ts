/** Renderer */
export interface Renderer {
  // closeApp command
  closeApp: () => void;
  // minimizeApp command
  minimizeApp: () => Promise<boolean>;
  // isTop: set a window on top
  onTop: (isTop: boolean) => Promise<boolean>;
  // toggle Theme between dark/light/system
  toggleTheme: (themeType: string) => Promise<boolean>;
  // maximize or restore command
  maximizeOrRestore: (toMaximized: boolean) => Promise<boolean>;
}

declare global {
  /* Renderer: a renderer that act as a middleware between electron process and renderer process
     for the entire app. you can access every property of Renderer,
    such as closeApp,minimizeApp, maximizeOrRestore, toggleTheme
   */
  const Renderer: Renderer;
  /**
   * CONFIG: provider a global context declaration for the 'config' package. with this you could access
   * any property and it value declared in default.json configuration file.
   */
  const CONFIG: any;
  /**
   *
   */
  const AppThemes: [
    'Auto',
    'Viva Light',
    'Viva Dark',
    'Nord',
    'Lither',
    'GrayHunt'
  ];
}
