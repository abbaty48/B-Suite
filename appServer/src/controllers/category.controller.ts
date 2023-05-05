import { productModel } from '@server-databases/mongodb/schema_product';
import { categoryModel } from '@server-databases/mongodb/schema_category';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import {
  Category,
  CategoryAddInput,
  CategoryAddPayload,
  CategoryDeletePayload,
  CategoryEditInput,
  CategoryEditPayload,
  CategoryPayload,
  PaginInput,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';

export class CategoryController {
  static categories = (pagin: PaginInput) => {
    return new Promise<CategoryPayload>(async (resolve) => {
      try {
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        //
        const categories = await categoryModel
          .find<Category>()
          .sort({ name: sort })
          .skip(limit * pageIndex)
          .limit(limit);
        //
        resolve({
          error: null,
          categories,
          pagins: {
            sort,
            currentPageIndex: pageIndex,
            nextPageIndex: pageIndex + 1,
            totalPaginated: categories.length,
            totalDocuments: await productModel.count(),
          }, // end pagin
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          categories: null,
        }); // end resolve
      } // end catch
    }); // end promise
  }; // end categories
  static addCategory = async (
    addCategoryInput: CategoryAddInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<CategoryAddPayload>(async (resolve) => {
      try {
        //
        const newAdded = await categoryModel.create({
          name: addCategoryInput.name,
        });

        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_CATEGORY */
        pubSub.publish('LISTEN_ADD_CATEGORY', {
          categoryAddSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newAdded,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Added,
            },
          },
        }); // end publish
        resolve({
          error: null,
          added: true,
          newAdded: newAdded.name,
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[EXCEPTION]: ${error.message}`,
          added: false,
          newAdded: null,
        });
      } // end catch
    }); // end promise
  }; // end addCategory
  static editCategory = async (
    editCategoryInput: CategoryEditInput,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<CategoryEditPayload>(async (resolve) => {
      try {
        //
        const { newCategory, oldCategory } = editCategoryInput;
        //
        const newEdited = await categoryModel.findOneAndUpdate(
          { name: oldCategory },
          { name: newCategory },
          { new: true, runValidators: true, context: 'query' }
        ); // end findOneAndUpdate

        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_CATEGORY */
        pubSub.publish('LISTEN_EDIT_CATEGORY', {
          categoryEditSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: newEdited,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Edited,
            }, // end payload
          }, // end categoryEditSubscription
        }); // end publish
        resolve({
          edited: true,
          error: null,
          newValue: newCategory,
          oldValue: oldCategory,
        }); // end resolver
      } catch (error) {
        resolve({
          edited: false,
          newValue: null,
          oldValue: editCategoryInput.oldCategory,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }; // end editCategory
  static deleteCategory = async (
    category: string,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<CategoryDeletePayload>(async (resolve) => {
      try {
        // FIND AND REMOVE THE CATEGORY AND RENAME ALL THE PRODUCT USING IT TO [UNCATEGORIZE]
        const deletedCategory = await categoryModel.findOneAndRemove({
          name: category,
        });
        //
        await productModel.updateMany(
          { 'category.name': category },
          { $set: { name: 'UNCATEGORIZED' } }
        );
        /** PUBLISH SUBSCRIPTION FOR LISTEN_ADD_CATEGORY */
        pubSub.publish('LISTEN_DELETE_CATEGORY', {
          categoryDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionResult: deletedCategory,
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Deleted,
            }, // end payload
          }, // end categoryDeleteSubscription
        }); // end publish
        resolve({ deleted: true, error: null });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  }; // end deleteCategory
} // end CategoryResolver
