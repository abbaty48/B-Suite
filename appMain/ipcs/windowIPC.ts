import { ipcMain, BrowserWindow, screen } from 'electron';
// ON CLOSE
ipcMain.on('close', (event) => {
  BrowserWindow.fromWebContents(event.sender).close();
});
// HANDLE WINDOW MINIMIZE
ipcMain.handle('minimize', (_event) => {
  const _target = BrowserWindow.fromWebContents(_event.sender);
  _target.minimize();
  return _target.isMinimized();
});
// HANDLE WINDOW MAXIMIZE OR RESTORE
ipcMain.handle('maximizeOrRestore', (_event, _maximize: boolean) => {
  const _target = BrowserWindow.fromWebContents(_event.sender);
  const { height, width } = screen.getPrimaryDisplay().workAreaSize;
  _target.setMaximumSize(width, height);

  if (_maximize) {
    const [minWidth, minHeight] = _target.getMinimumSize();
    _target.setSize(minWidth, minHeight);
    _target.center();
    return false;
  } else {
    _target.setSize(width, height);
    _target.center();
    return true;
  }
});
// HANDLE WINDOW ON TOP
ipcMain.handle('onTop', (_event, _isTop) => {
  const _target = BrowserWindow.fromWebContents(_event.sender);
  _target.setAlwaysOnTop(_isTop, 'normal');
  return _target.isAlwaysOnTop();
});
