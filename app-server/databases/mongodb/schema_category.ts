import { Model, Schema, model, models } from 'mongoose';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';

const CategorySchema = new Schema<ICategory>({
  name: {
    type: 'string',
    required: true,
    validate: {
      validator: async function (this: ICategory): Promise<boolean> {
        return (await categoryModel.exists({ name: this.name })) ? false : true;
      },
      msg: '[DUPLICATE ERROR]: A category with the same name could not exist.',
    },
  },
});


export const categoryModel =
  (models.category as Model<ICategory>) || model('category', CategorySchema);
