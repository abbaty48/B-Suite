import fs from 'fs';
import path, { resolve } from 'path';

export interface IFileStats {
  url: string;
  size: number;
  fileName: string;
  filePath: string;
  extension: string;
}
// TODO: add extension check
// TODO: add max size constraint
export const serverFileUploader = (
  filePath: string,
  uploadPath: string,
  serverUrl: string,
  destinatedName?: string
) => {
  return new Promise<IFileStats | null>(async (resolve) => {
    try {
      //
      let _fileStats: IFileStats;
      //
      const _fileName = (
        destinatedName
          ? `${destinatedName}${path.extname(filePath)}`
          : path.basename(filePath)
      )
        .replace(/^\s$/g, '_')
        .toLowerCase();

      const _filePath = path.join(uploadPath, _fileName);
      //
      const stats = fs.statSync(filePath); // end fs.stat
      _fileStats = {
        size: stats.size,
        fileName: _fileName,
        filePath: _filePath,
        extension: path.extname(filePath),
        url: `${serverUrl}/${_filePath}`.replace(/\\/g, '/'),
      };

      // CREATE THE UPLOADED PATH IF NOT EXISTS
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      // WRITESTREAM TO THE FILE
      const _writeStream = fs.createWriteStream(path.resolve(_filePath), {
        flags: 'w',
        autoClose: true,
        encoding: 'binary',
      });
      //  read file
      fs.readFile(
        filePath,
        {
          flag: 'r',
          encoding: 'binary',
        },
        (error, data: string) => {
          if (error?.message) {
            return resolve(null);
          }
          // write it
          _writeStream.write(data, () => {
            _writeStream.close();
          });
        } // end error
      ); // end readFile
      resolve(_fileStats);
    } catch (error) {
      console.log('#ERROR IN FILE.ts: ', error);
      resolve(null);
    }
  }); // end promise
};

export const deleteFileUploader = (targetFilePath: string) => {
  return new Promise((resolve) => {
    try {
      fs.rmSync(targetFilePath, { recursive: true, force: true });
      resolve(true);
    } catch (error) {
      console.log('#ERROR IN deleteFileUploader FUNCTION: ', error);
      resolve(false);
    } // end  catch
  }); // end promise
}; // end deleteFileUploader

export const deleteDirUploader = (targetDirectoryPath: string) => {
  return new Promise((resolve) => {
    try {
      fs.rmSync(targetDirectoryPath, { recursive: true });
      resolve(true);
    } catch (error) {
      resolve(false);
    } // end  catch
  }); // end promise
}; // end deleteFileUploader

export const checkFileExistant = (targetFilePath: string) => {
  return new Promise((resolve) => {
    try {
      resolve(fs.existsSync(targetFilePath));
    } catch (error) {
      resolve(false);
    }
  }); // end promise
}; // end checkFileExistant
