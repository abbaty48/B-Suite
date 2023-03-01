import { CategoryResolver } from '@server-resolvers/category.resolver';
import { WarehouseResolver } from '@server-resolvers/warehouse.resolver';
import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

export const resolvers = {
  Query: {
    categories: async (_: any): Promise<ICategory[]> => {
      return await CategoryResolver.categories();
    },
    warehouses: async (
      _: any,
      args: any,
      context: IResolverContext
    ): Promise<IWarehouse[]> => {
      return await WarehouseResolver.warehouses(context);
    },
  },
  Mutation: {
    // CATEGORY
    addCategory: async (_: any, { category }: any) => {
      return await CategoryResolver.addCategory(category);
    },
    editCategory: async (_: any, { oldCategory, newCategory }: any) => {
      return await CategoryResolver.editCategory(oldCategory, newCategory);
    },
    deleteCategory: async (_: any, { category }: any) => {
      return await CategoryResolver.deleteCategory(category);
    },
    // WAREHOUSE
    addWarehouse: async (
      _: any,
      { warehouseID, address, staffs, products }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.addWarehouse(
        {
          warehouseID,
          address,
          staffs,
          products,
        },
        { request, response, config }
      );
    },
    editWarehouse: async (
      _: any,
      { warehouseID, address, staffs, products }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.editWarehouse(warehouseID, {
        request,
        response,
        config,
      });
    },
    deleteWarehouse: async (
      _: any,
      { warehouseID }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.deleteWarehouse(warehouseID, {
        request,
        response,
        config,
      });
    },
  },
};
