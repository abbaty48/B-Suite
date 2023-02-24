import { ipcMain, BrowserWindow } from 'electron';

ipcMain.on('close', (event) => {
  BrowserWindow.fromWebContents(event.sender).close();
});
ipcMain.on('minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender).minimize();
});
ipcMain.handle('maximizeOrRestore', (_event, _maximized) => {
  _maximized
    ? BrowserWindow.fromWebContents(_event.sender).unmaximize()
    : BrowserWindow.fromWebContents(_event.sender).maximize();

  return BrowserWindow.fromWebContents(_event.sender).isMaximized();
});
ipcMain.handle('onTop', (_event, _isTop) => {
  BrowserWindow.fromWebContents(_event.sender).setAlwaysOnTop(_isTop, 'normal');
  return BrowserWindow.fromWebContents(_event.sender).isAlwaysOnTop();
});
