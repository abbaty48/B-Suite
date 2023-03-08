import { SaleResolver } from '@server-resolvers/sale.resolver';
import { StaffResolver } from '@server-resolvers/staff.resolver';
import { ProductResolver } from '@server-resolvers/product.resolver';
import { CategoryResolver } from '@server-resolvers/category.resolver';
import { WarehouseResolver } from '@server-resolvers/warehouse.resolver';

import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IWarehouse } from '@server-databases/mongodb/interfaces/IWarehouse';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';
import {
  IStaffPayload,
  IStaffsPayload,
} from '@server-databases/mongodb/interfaces/IStaff';

export const resolvers = {
  Query: {
    // STAFF
    staff: async (
      _: any,
      { searchFilter }: any,
      context: IResolverContext
    ): Promise<IStaffPayload> => {
      return await StaffResolver.staff(searchFilter, context);
    },
    staffs: async (
      _: any,
      { searchFilter, filters }: any,
      context: IResolverContext
    ): Promise<IStaffsPayload> => {
      return await StaffResolver.staffs(searchFilter, filters, context);
    },
    // PRODUCT
    product: async (_: any, { searchFilter }: any, context: IResolverContext) =>
      await ProductResolver.product(searchFilter, context),
    products: async (
      _: any,
      { searchFilter, filters }: any,
      context: IResolverContext
    ) => await ProductResolver.products(searchFilter, filters, context),
    // CATEGORY
    categories: async (_: any): Promise<ICategory[]> => {
      return await CategoryResolver.categories();
    },
    // WAREHOUSE
    warehouses: async (
      _: any,
      args: any,
      context: IResolverContext
    ): Promise<IWarehouse[]> => {
      return await WarehouseResolver.warehouses(context);
    },
    // SALE
    sale: async (_: any, { searchFilter }: any, context: IResolverContext) =>
      await SaleResolver.sale(searchFilter, context),
    sales: async (
      _: any,
      { searchFilter, filters }: any,
      context: IResolverContext
    ) => await SaleResolver.sales(searchFilter, filters, context),
  },
  Mutation: {
    // STAFF
    addStaff: async (_: any, inputs: any, context: IResolverContext) => {
      return await StaffResolver.addStaff(inputs, context);
    },
    editStaff: async (_: any, inputs: any, context: IResolverContext) => {
      return await StaffResolver.editStaff(inputs, context);
    },
    deleteStaff: async (
      _: any,
      { staffID }: any,
      context: IResolverContext
    ) => {
      return await StaffResolver.deleteStaff(staffID, context);
    },
    // PRODUCT
    addProduct: async (
      _: any,
      { addProductInput }: any,
      context: IResolverContext
    ) => await ProductResolver.addProduct(addProductInput, context),
    editProduct: async (
      _: any,
      { editProductInput }: any,
      context: IResolverContext
    ) => await ProductResolver.editProduct(editProductInput, context),
    deleteProduct: async (
      _: any,
      { productID, warehouseID }: any,
      context: IResolverContext
    ) => await ProductResolver.deleteProduct(productID, warehouseID, context),
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
      { warehouseID, name, address, staffs, products }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.editWarehouse(
        {
          warehouseID,
          address,
          staffs,
          products,
        },
        {
          request,
          response,
          config,
        }
      );
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
    // SALE
    addSale: async (_: any, { addSaleInput }: any, context: IResolverContext) =>
      SaleResolver.addSale(addSaleInput, context),
    editSale: async (
      _: any,
      { editSaleInput }: any,
      context: IResolverContext
    ) => SaleResolver.editSale(editSaleInput, context),
    deleteSale: async (
      _: any,
      { saleID, warehouseID }: any,
      context: IResolverContext
    ) => SaleResolver.deleteSale(saleID, warehouseID, context),
  },
};
