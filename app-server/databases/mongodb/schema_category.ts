import { Model, Schema, model, models } from 'mongoose';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';

export const categoryModel =
  (models.category as Model<ICategory>) ||
  model(
    'category',
    new Schema<ICategory>({
      name: { type: 'string', required: true },
    })
  );
