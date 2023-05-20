import { SaleController } from '@server-controllers/sale.controller';
import { StaffController } from '@server-controllers/staff.controller';
import { StoreController } from '@server-controllers/store.controller';
import { SupplyController } from '@server-controllers/supply.controller';
import { MutationResolvers } from '@server-models/@types/resolver_types';
import { ProductController } from '@server-controllers/product.controller';
import { CustomerController } from '@server-controllers/customer.controller';
import { CategoryController } from '@server-controllers/category.controller';
import { WarehouseController } from '@server-controllers/warehouse.controller';

// PRODUCT MUTATIONS

const ProductMutations: MutationResolvers = {
  // productAdd
  productAdd: async (_, { productAddInput }, context) =>
    await ProductController.addProduct(productAddInput, context),
  // productEdit
  productEdit: async (_, { productEditInput }, context) =>
    await ProductController.editProduct(productEditInput, context),
  // productDelete
  productDelete: async (_, { productID, warehouseID }, context) =>
    await ProductController.deleteProduct(productID, warehouseID, context),
};

// STAFF MUTATIONS

const StaffMutations: MutationResolvers = {
  // staffAdd
  staffAdd: async (_, { staffAddInput }, context) =>
    await StaffController.addStaff(staffAddInput, context),
  // staffEdit
  staffEdit: async (_, { staffEditInput }, context) =>
    await StaffController.editStaff(staffEditInput, context),
  // staffDelete
  staffDelete: async (_, { staffID }, context) =>
    await StaffController.deleteStaff(staffID, context),
  //staffResetPassword
  staffResetPassword: async (_, { staffResetPasswordInput }, context) =>
    await StaffController.resetPassword(staffResetPasswordInput, context),
  // authenticate
  authenticate: async (_, { credential }, context) =>
    await StaffController.authenticate(credential, context),
};

// CATEGORY MUTATIONS
const CategoryMutations: MutationResolvers = {
  // Add Category
  categoryAdd: async (_, { categoryAddInput }, context) =>
    await CategoryController.addCategory(categoryAddInput, context),
  // Edit Category
  categoryEdit: async (_, { categoryEditInput }, context) =>
    await CategoryController.editCategory(categoryEditInput, context),
  // Delete Category
  categoryDelete: async (_, { category }, context) =>
    await CategoryController.deleteCategory(category, context),
};

// WAREHOUSE MUTATIONS
const WarehouseMutations: MutationResolvers = {
  warehouseAdd: async (_, { warehouseAddInput }, context) =>
    await WarehouseController.addWarehouse(warehouseAddInput, context),
  warehouseEdit: async (_, { warehouseEditInput }, context) =>
    await WarehouseController.editWarehouse(warehouseEditInput, context),
  warehouseDelete: async (_, { warehouseID }, context) =>
    await WarehouseController.deleteWarehouse(warehouseID, context),
};

// SUPPLY MUTATIONS
const SupplyMutations: MutationResolvers = {
  // MakeSupply
  makeSupply: async (_, { supplyAddInput, warehouseID }, context) =>
    await SupplyController.makeSupply(supplyAddInput, context, warehouseID),
  // supplyEdit
  supplyEdit: async (_, { supplyID, warehouseID, supplyEditInput }, context) =>
    await SupplyController.editSupply(
      supplyID,
      supplyEditInput,
      context,
      warehouseID
    ),
  // supplyDelete
  supplyDelete: async (_, { supplyDeleteInput }, context) =>
    await SupplyController.deleteSupply(supplyDeleteInput, context),
};

// CUSTOMER MUTATIONS
const CustomerMutations: MutationResolvers = {
  customerAdd: async (_, { customerAddInput }) =>
    await CustomerController.addCustomer(customerAddInput),
  customerEdit: async (_, { customerEditInput }) =>
    await CustomerController.editCustomer(customerEditInput),
  customerDelete: async (_, { customerDeleteInput }) =>
    await CustomerController.deleteCustomer(customerDeleteInput),
};

// SALE MUTATIONS
const SaleMutations: MutationResolvers = {
  saleAdd: async (_, { saleAddInput }, context) =>
    await SaleController.addSale(saleAddInput, context),
  saleEdit: async (_, { saleEditInput }, context) =>
    await SaleController.editSale(saleEditInput, context),
  saleDelete: async (_, { saleID, warehouseID }, context) =>
    await SaleController.deleteSale(saleID, warehouseID, context),
};

// STORE MUTATIONS
const StoreMutations: MutationResolvers = {
  enterpriseAdd: async (_, { enterpriseAddInput }) =>
    await StoreController.addEnterprise(enterpriseAddInput),
  enterpriseEdit: async (_, { enterpriseEditInput }) =>
    await StoreController.editEnterprise(enterpriseEditInput),
  _initializeSys: async (_, { _init }) =>
    await StoreController._initializeSys(_init),
};

export const Mutations: MutationResolvers = {
  ...WarehouseMutations,
  ...CategoryMutations,
  ...CustomerMutations,
  ...ProductMutations,
  ...SupplyMutations,
  ...StaffMutations,
  ...StoreMutations,
  ...SaleMutations,
};
