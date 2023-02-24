// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
// #1
contextBridge.exposeInMainWorld('Renderer', {
  // toggleTheme
  toggleTheme: (themeType: string) =>
    ipcRenderer.invoke('themeMode', themeType),
  // minimize
  minimizeApp: () => ipcRenderer.send('minimize'),
  // close
  closeApp: () => ipcRenderer.send('close'),
  // toggleMaximize
  miximizeRestore: (toMaximized: boolean) =>
    ipcRenderer.invoke('maximizeOrRestore', toMaximized),
});
