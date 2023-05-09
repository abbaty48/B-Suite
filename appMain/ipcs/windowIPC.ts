import { ipcMain, BrowserWindow } from 'electron';
// ON CLOSE
ipcMain.on('close', (event) => {
  BrowserWindow.fromWebContents(event.sender).close();
});
// HANDLE WINDOW MINIMIZE
ipcMain.handle('minimize', (_event) => {
  BrowserWindow.fromWebContents(_event.sender).minimize();
  return BrowserWindow.fromWebContents(_event.sender).isMinimized();
});
// HANDLE WINDOW MAXIMIZE OR RESTORE
ipcMain.handle('maximizeOrRestore', (_event, _maximized) => {
  _maximized
    ? BrowserWindow.fromWebContents(_event.sender).unmaximize()
    : BrowserWindow.fromWebContents(_event.sender).maximize();

  return BrowserWindow.fromWebContents(_event.sender).isMaximized();
});
// HANDLE WINDOW ON TOP
ipcMain.handle('onTop', (_event, _isTop) => {
  BrowserWindow.fromWebContents(_event.sender).setAlwaysOnTop(_isTop, 'normal');
  return BrowserWindow.fromWebContents(_event.sender).isAlwaysOnTop();
});
