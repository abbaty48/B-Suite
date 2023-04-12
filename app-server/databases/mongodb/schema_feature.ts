import { Schema } from 'mongoose';
import { IFeature } from '@server-databases/mongodb/interfaces/IFeature';

export const FeatureSchema = new Schema<IFeature>({
  url: { type: 'string', required: true },
  size: { type: 'number', required: true },
  fileName: { type: 'string', required: true },
  extension: { type: 'string', required: true },
  filePath: { type: 'string', required: true },
});
