/* 
   CRASH-REPORTER

   - Monitor any exception that occured within the application and report it (Notification) and log it
 */
import { BrowserWindow, crashReporter } from 'electron';
import { productName } from '../../package.json';

crashReporter.start({
  uploadToServer: false,
  productName: productName,
});

const uncaughtExceptionHandler = (err: any) => {
  BrowserWindow.getFocusedWindow().webContents.send('mainError', { err });
};

if (process.type === 'browser') {
  process.on('uncaughtException', uncaughtExceptionHandler);
} else {
  window.addEventListener('error', uncaughtExceptionHandler);
}

console.info('[INFO] Crash reporting started.');
