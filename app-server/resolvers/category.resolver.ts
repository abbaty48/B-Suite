import { categoryModel } from '@server-databases/mongodb/schema_category';
import {
  ICategory,
  ICategoryAddPayload,
  ICategoryDeletePayload,
  ICategoryEditPayload,
} from '@server-databases/mongodb/interfaces/ICategory';
import { productModel } from '@server-databases/mongodb/schema_product';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

export const CategoryResolver = {
  categories: async (): Promise<ICategory[]> => {
    return await categoryModel.find<ICategory>();
  },
  addCategory: async (
    addCategoryInput: {
      name: string;
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICategoryAddPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_CATEGORY
        );
        //
        const newAdded = (
          await categoryModel.create({ name: addCategoryInput.name })
        ).name;
        resolve({
          error: null,
          added: true,
          newAdded,
        });
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          added: false,
          newAdded: null,
        });
      } // end catch
    }); // end promise
  }, // end addCategory
  editCategory: async (
    editCategoryInput: {
      oldCategory: string;
      newCategory: string;
    },
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICategoryEditPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_CATEGORY
        );
        //
        const { newCategory, oldCategory } = editCategoryInput;
        //
        await categoryModel.findOneAndUpdate(
          { name: oldCategory },
          { name: newCategory },
          { new: true, runValidators: true, context: 'query' }
        ); // end findOneAndUpdate

        resolve({
          edited: true,
          error: null,
          newValue: newCategory,
          oldValue: oldCategory,
        });
      } catch (error) {
        resolve({
          edited: false,
          newValue: null,
          oldValue: editCategoryInput.oldCategory,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }, // end editCategory
  deleteCategory: async (
    category: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICategoryDeletePayload>(async (resolve) => {
      try {
        // Authenticate and Authorize action user
        staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_CATEGORY
        );

        // FIND AND REMOVE THE CATEGORY AND RENAME ALL THE PRODUCT USING IT TO [UNCATEGORIZE]
        await categoryModel.findOneAndRemove({ name: category });
        //
        await productModel.updateMany(
          { 'category.name': category },
          { $set: { name: 'UNCATEGORIZED' } }
        );
        resolve({ deleted: true, error: null });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }, // end deleteCategory
}; // end CategoryResolver
