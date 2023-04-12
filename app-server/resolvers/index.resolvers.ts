import { SaleResolver } from '@server-resolvers/sale.resolver';
import { StoreResolver } from '@server-resolvers/store.resolver';
import { StaffResolver } from '@server-resolvers/staff.resolver';
import { SupplyResolver } from '@server-resolvers/supply.resolver';
import { ProductResolver } from '@server-resolvers/product.resolver';
import { CustomerResolver } from '@server-resolvers/customer.resolver';
import { CategoryResolver } from '@server-resolvers/category.resolver';
import { WarehouseResolver } from '@server-resolvers/warehouse.resolver';

import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';
import {
  IStaffPayload,
  IStaffsPayload,
} from '@server-databases/mongodb/interfaces/IStaff';

export const resolvers = {
  Query: {
    //#region STAFF
    staff: async (
      _: any,
      { searchFilter }: any,
      context: IResolverContext
    ): Promise<IStaffPayload> => {
      return await StaffResolver.staff(searchFilter, context);
    },
    staffs: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ): Promise<IStaffsPayload> => {
      return await StaffResolver.staffs(searchFilter, pagin, context);
    },
    //#endregion STAFFS

    //#region PRODUCT
    product: async (_: any, { searchFilter }: any, context: IResolverContext) =>
      await ProductResolver.product(searchFilter, context),
    products: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ) => await ProductResolver.products(searchFilter, pagin, context),
    //#endregion PRODUCT

    //#region CATEGORY
    categories: async (_: any): Promise<ICategory[]> => {
      return await CategoryResolver.categories();
    },
    //#endregion CATEGORY

    //#region WAREHOUSE
    warehouse: async (
      _: any,
      { searchFilter }: any,
      context: IResolverContext
    ) => await WarehouseResolver.warehouse(searchFilter, context),
    warehouses: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ) => await WarehouseResolver.warehouses(searchFilter, pagin, context),
    //#endregion WARHOUSE

    //#region SALE
    sale: async (_: any, { searchFilter }: any, context: IResolverContext) =>
      await SaleResolver.sale(searchFilter, context),
    sales: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ) => await SaleResolver.sales(searchFilter, pagin, context),
    //#endregion SALE

    //#region CUSTOMER
    customer: async (
      _: any,
      { searchFilter }: any,
      context: IResolverContext
    ) => await CustomerResolver.customer(searchFilter, context),
    customers: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ) => await CustomerResolver.customers(searchFilter, pagin, context),
    //#endregion CUSTOMER

    //#region SUPPLY
    supply: async (_: any, { searchFilter }: any, context: IResolverContext) =>
      await SupplyResolver.supply(searchFilter, context),
    supplies: async (
      _: any,
      { searchFilter, pagin }: any,
      context: IResolverContext
    ) => await SupplyResolver.supplies(searchFilter, pagin, context),
    //#endregion PURCHASE
    // STORE
    store: async (_: any, _args: any, context: IResolverContext) =>
      await StoreResolver.store(context),
  },
  Mutation: {
    //#region STAFF
    addStaff: async (
      _: any,
      { addStaffInput }: any,
      context: IResolverContext
    ) => {
      return await StaffResolver.addStaff(addStaffInput, context);
    },
    editStaff: async (
      _: any,
      { editStaffInput }: any,
      context: IResolverContext
    ) => {
      return await StaffResolver.editStaff(editStaffInput, context);
    },
    deleteStaff: async (
      _: any,
      { staffID }: any,
      context: IResolverContext
    ) => {
      return await StaffResolver.deleteStaff(staffID, context);
    },
    //#endregion

    //#region PRODUCT
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
    //#endregion

    //#region CATEGORY
    addCategory: async (
      _: any,
      { addCategoryInput }: any,
      context: IResolverContext
    ) => {
      return await CategoryResolver.addCategory(addCategoryInput, context);
    },
    editCategory: async (
      _: any,
      { editCategoryInput }: any,
      context: IResolverContext
    ) => {
      return await CategoryResolver.editCategory(editCategoryInput, context);
    },
    deleteCategory: async (
      _: any,
      { category }: any,
      context: IResolverContext
    ) => {
      return await CategoryResolver.deleteCategory(category, context);
    },
    //#endregion

    //#region WAREHOUSE
    addWarehouse: async (
      _: any,
      { addWarehouseInput }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.addWarehouse(addWarehouseInput, {
        request,
        response,
        config,
      });
    },
    editWarehouse: async (
      _: any,
      { editWarehouseInput }: any,
      { request, response, config }: IResolverContext
    ) => {
      return await WarehouseResolver.editWarehouse(editWarehouseInput, {
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
    //#endregion

    //#region SALE
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
    //#endregion

    //#region CUSTOMER
    addCustomer: async (
      _: any,
      { addCustomerInput }: any,
      context: IResolverContext
    ) => await CustomerResolver.addCustomers(addCustomerInput, context),
    editCustomer: async (
      _: any,
      { editCustomerInput }: any,
      context: IResolverContext
    ) => await CustomerResolver.editCustomers(editCustomerInput, context),
    deleteCustomer: async (
      _: any,
      { customerID, warehouseID }: any,
      context: IResolverContext
    ) =>
      await CustomerResolver.deleteCustomers(customerID, warehouseID, context),
    //#endregion

    //#region SUPPLY
    makeSupply: async (
      _: any,
      { addSupplyInput, warehouseID }: any,
      context: IResolverContext
    ) => await SupplyResolver.makeSupply(addSupplyInput, context, warehouseID),
    editSupply: async (
      _: any,
      { supplyID, editSupplyInput, warehouseID }: any,
      context: IResolverContext
    ) =>
      await SupplyResolver.editSupply(
        supplyID,
        editSupplyInput,
        context,
        warehouseID
      ),
    deleteSupply: async (
      _: any,
      { supplyID, warehouseID }: any,
      context: IResolverContext
    ) => await SupplyResolver.deleteSupply(supplyID, context, warehouseID),
    //#endregion

    //#region STORE
    addEnterprise: async (
      _: any,
      { addEnterpriseInput }: any,
      context: IResolverContext
    ) => StoreResolver.addEnterprise(addEnterpriseInput, context),
    editEnterprise: async (
      _: any,
      { editEnterpriseInput }: any,
      context: IResolverContext
    ) => StoreResolver.editEnterprise(editEnterpriseInput, context),
    _initializeSys: async (_: any, { _init }: any, context: IResolverContext) =>
      StoreResolver._initializeSys(_init, context),
    //#endregion
  },
};
