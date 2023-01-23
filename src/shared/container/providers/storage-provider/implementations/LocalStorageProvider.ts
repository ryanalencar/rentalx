import fs from 'fs';
import { resolve } from 'path';

import { uploadConfig } from '@config/upload';

import { IStorageProvider } from '../IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tempFolder, file),
      resolve(`${uploadConfig.tempFolder}/${folder}`, file),
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${uploadConfig.tempFolder}/${folder}`, file);

    try {
      await fs.promises.stat(fileName);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(fileName);
  }
}
