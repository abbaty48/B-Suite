import { CallbackError } from 'mongoose';
import { mongodbService } from '@server-datasources/index.datasources';
import { categoryModel } from '@server-databases/mongodb/schema_category';
import {
  ICategory,
  ICategoryAddPayload,
  ICategoryDeletePayload,
  ICategoryEditPayload,
} from '@server-databases/mongodb/interfaces/ICategory';
import { productModel } from '@server-databases/mongodb/schema_product';

mongodbService();

export const CategoryResolver = {
  categories: async (): Promise<ICategory[]> => {
    return await categoryModel.find<ICategory>();
  },
  addCategory: async (category: string) => {
    return new Promise<ICategoryAddPayload>(async (resolve) => {
      try {
        if (await categoryModel.exists({ name: category })) {
          return resolve({
            error: `Category with the name "${category}" already exist, please provide a new one.`,
            added: false,
          });
        } // end if-exists
        categoryModel.create((error: CallbackError, result: string) => {
          if (error) {
            return resolve({
              error: 'Error adding a new category, REASON: ' + error.message,
              added: false,
            });
          }
          resolve({
            error: null,
            added: true,
          });
        });
      } catch (error) {
        resolve({
          error: error.message,
          added: false,
        });
      } // end catch
    }); // end promise
  }, // end addCategory
  editCategory: async (oldCategory: string, newCategory: string) => {
    return new Promise<ICategoryEditPayload>(async (resolve) => {
      if (await categoryModel.exists({ name: newCategory })) {
        return resolve({
          error: `Category with the name "${newCategory}" already exist, please provide a new one.`,
          edited: false,
          newValue: null,
          oldValue: oldCategory,
        });
      } // end if-exists

      categoryModel.findOneAndUpdate(
        { name: oldCategory },
        { name: newCategory },
        async (error: CallbackError, updatedCategory: ICategory) => {
          // if error
          if (error) {
            return resolve({
              edited: false,
              newValue: null,
              error: error.message,
              oldValue: oldCategory,
            });
          } // end error

          // update all products under the oldCategory to a newCategory
          try {
            await productModel.updateMany(
              { category: oldCategory },
              { $rename: { category: newCategory } }
            );
            resolve({
              edited: true,
              error: null,
              newValue: newCategory,
              oldValue: oldCategory,
            });
          } catch (error) {
            resolve({
              edited: false,
              error: error.message,
              newValue: null,
              oldValue: oldCategory,
            });
          } // end catch
        } // end callback
      ); // end findOneAndUpdate
    }); // end Promise
  }, // end editCategory
  deleteCategory: async (category: string) => {
    return new Promise<ICategoryDeletePayload>((resolve) => {
      categoryModel.findOneAndRemove(
        { name: category },
        async (error: CallbackError, deletedCategory: ICategory) => {
          if (error) {
            return resolve({ deleted: false, error: error.message });
          } // end if

          try {
            await productModel.updateMany(
              { category: category },
              { $rename: { category: 'UNCATEGORIZE' } }
            );
            resolve({ deleted: true, error: null });
          } catch (error) {
            resolve({ error: error.message, deleted: false });
          } // end catch
        } // end  callback
      ); // end findOneAndRemove
    }); // end Promise
  }, // end deleteCategory
}; // end CategoryResolver
