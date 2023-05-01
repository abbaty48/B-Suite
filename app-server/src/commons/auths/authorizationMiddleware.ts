import { GraphQLError } from 'graphql';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { RolePrevileges } from '@server-models/databases/mongodb/enums/RolePrevilege';

interface IStaffPrevilege {
  Admin: RolePrevileges[];
  Manager: RolePrevileges[];
  Saller: RolePrevileges[];
  Warehouse: RolePrevileges[];
  Accountant: RolePrevileges[];
  [index: string]: RolePrevileges[];
}

export const AuthorizeStaff = (
  previlege: any,
  authenticatedStaff: IStaff
): IStaff => {
  const staffPrevileges: IStaffPrevilege = {
    Accountant: [
      // CATEGORY
      RolePrevileges.ALL_CATEGORY_OPERATIONS,
      RolePrevileges.ADD_CATEGORY,
      RolePrevileges.READ_CATEGORY,
      RolePrevileges.UPDATE_CATEGORY,
      RolePrevileges.DELETE_CATEGORY,
      // PRODUCT
      RolePrevileges.ALL_PRODUCT_OPERATIONS,
      RolePrevileges.ADD_PRODUCT,
      RolePrevileges.READ_PRODUCT,
      RolePrevileges.UPDATE_PRODUCT,
      RolePrevileges.DELETE_PRODUCT,
      // SALE
      RolePrevileges.ALL_SALE_OPERATIONS,
      RolePrevileges.ADD_SALE,
      RolePrevileges.READ_SALE,
      RolePrevileges.UPDATE_SALE,
      RolePrevileges.DELETE_SALE,
      // WAREHOUSE
      RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
      RolePrevileges.ADD_WAREHOUSE,
      RolePrevileges.READ_WAREHOUSE,
      RolePrevileges.UPDATE_WAREHOUSE,
      RolePrevileges.DELETE_WAREHOUSE,
      // CUSTOMER
      RolePrevileges.ALL_CUSTOMER_OPERATIONS,
      RolePrevileges.ADD_CUSTOMER,
      RolePrevileges.READ_CUSTOMER,
      RolePrevileges.UPDATE_CUSTOMER,
      RolePrevileges.DELETE_CUSTOMER,
      // STAFF
      RolePrevileges.ALL_STAFF_OPERATIONS,
      RolePrevileges.ADD_STAFF,
      RolePrevileges.READ_STAFF,
      RolePrevileges.UPDATE_STAFF,
      RolePrevileges.DELETE_STAFF,
      // SUPPLY
      RolePrevileges.ALL_SUPPLY_OPERATIONS,
      RolePrevileges.ADD_SUPPLY,
      RolePrevileges.READ_SUPPLY,
      RolePrevileges.UPDATE_SUPPLY,
      RolePrevileges.DELETE_SUPPLY,
      // SUBSCRIPTION
      RolePrevileges.LISTEN_ADD_CATEGORY,
      RolePrevileges.LISTEN_ADD_PRODUCT,
      RolePrevileges.LISTEN_ADD_SALE,
      RolePrevileges.LISTEN_ADD_STAFF,
      RolePrevileges.LISTEN_ADD_SUPPLY,
      RolePrevileges.LISTEN_ADD_WAREHOUSE,
      RolePrevileges.LISTEN_EDIT_CATEGORY,
      RolePrevileges.LISTEN_EDIT_PRODUCT,
      RolePrevileges.LISTEN_EDIT_SALE,
      RolePrevileges.LISTEN_EDIT_SUPPLY,
      RolePrevileges.LISTEN_EDIT_WAREHOUSE,
      RolePrevileges.LISTEN_DELETE_CATEGORY,
      RolePrevileges.LISTEN_DELETE_PRODUCT,
      RolePrevileges.LISTEN_DELETE_SALE,
      RolePrevileges.LISTEN_DELETE_STAFF,
      RolePrevileges.LISTEN_DELETE_SUPPLY,
      RolePrevileges.LISTEN_DELETE_WAREHOUSE,
    ],
    Manager: [
      // CATEGORY
      RolePrevileges.ALL_CATEGORY_OPERATIONS,
      RolePrevileges.ADD_CATEGORY,
      RolePrevileges.READ_CATEGORY,
      RolePrevileges.UPDATE_CATEGORY,
      RolePrevileges.DELETE_CATEGORY,
      // PRODUCTS
      RolePrevileges.ALL_PRODUCT_OPERATIONS,
      RolePrevileges.ADD_PRODUCT,
      RolePrevileges.READ_PRODUCT,
      RolePrevileges.UPDATE_PRODUCT,
      RolePrevileges.DELETE_PRODUCT,
      // SALE
      RolePrevileges.READ_SALE,
      RolePrevileges.UPDATE_SALE,
      RolePrevileges.DELETE_SALE,
      // WAREHOUSE
      RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
      RolePrevileges.ADD_WAREHOUSE,
      RolePrevileges.READ_WAREHOUSE,
      RolePrevileges.UPDATE_WAREHOUSE,
      RolePrevileges.DELETE_WAREHOUSE,
      // CUSTOMER
      RolePrevileges.DELETE_CUSTOMER,
      RolePrevileges.READ_CUSTOMER,
      RolePrevileges.UPDATE_CUSTOMER,
      // STAFF
      RolePrevileges.ALL_STAFF_OPERATIONS,
      RolePrevileges.ADD_STAFF,
      RolePrevileges.READ_STAFF,
      RolePrevileges.UPDATE_STAFF,
      RolePrevileges.DELETE_STAFF,
      // SUPPLY
      RolePrevileges.ALL_SUPPLY_OPERATIONS,
      RolePrevileges.ADD_SUPPLY,
      RolePrevileges.READ_SUPPLY,
      RolePrevileges.UPDATE_SUPPLY,
      RolePrevileges.DELETE_SUPPLY,
      // SUBSCRIPTION
      RolePrevileges.LISTEN_ADD_CATEGORY,
      RolePrevileges.LISTEN_ADD_PRODUCT,
      RolePrevileges.LISTEN_ADD_SALE,
      RolePrevileges.LISTEN_ADD_STAFF,
      RolePrevileges.LISTEN_ADD_SUPPLY,
      RolePrevileges.LISTEN_ADD_WAREHOUSE,
      RolePrevileges.LISTEN_EDIT_CATEGORY,
      RolePrevileges.LISTEN_EDIT_PRODUCT,
      RolePrevileges.LISTEN_EDIT_SALE,
      RolePrevileges.LISTEN_EDIT_SUPPLY,
      RolePrevileges.LISTEN_EDIT_WAREHOUSE,
      RolePrevileges.LISTEN_DELETE_CATEGORY,
      RolePrevileges.LISTEN_DELETE_PRODUCT,
      RolePrevileges.LISTEN_DELETE_SALE,
      RolePrevileges.LISTEN_DELETE_STAFF,
      RolePrevileges.LISTEN_DELETE_SUPPLY,
      RolePrevileges.LISTEN_DELETE_WAREHOUSE,
      // ENTERPRISE
      RolePrevileges.ADD_ENTERPRISE,
      RolePrevileges.UPDATE_ENTERPRISE,
      // INITIALIZED_SYSTEM
      RolePrevileges.INITIALIZED_SYSTEM,
    ],
    Warehouse: [
      // CATEGORY
      RolePrevileges.ALL_CATEGORY_OPERATIONS,
      RolePrevileges.ADD_CATEGORY,
      RolePrevileges.READ_CATEGORY,
      RolePrevileges.UPDATE_CATEGORY,
      RolePrevileges.DELETE_CATEGORY,
      // PRODUCT
      RolePrevileges.ALL_PRODUCT_OPERATIONS,
      RolePrevileges.ADD_PRODUCT,
      RolePrevileges.READ_PRODUCT,
      RolePrevileges.UPDATE_PRODUCT,
      RolePrevileges.DELETE_PRODUCT,
      // WAREHOUSE
      RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
      RolePrevileges.ADD_WAREHOUSE,
      RolePrevileges.READ_WAREHOUSE,
      RolePrevileges.UPDATE_WAREHOUSE,
      RolePrevileges.DELETE_WAREHOUSE,
      // SUBSCRIPTION
      RolePrevileges.LISTEN_ADD_PRODUCT,
      RolePrevileges.LISTEN_ADD_SUPPLY,
      RolePrevileges.LISTEN_ADD_WAREHOUSE,
      RolePrevileges.LISTEN_EDIT_PRODUCT,
      RolePrevileges.LISTEN_EDIT_SUPPLY,
      RolePrevileges.LISTEN_EDIT_WAREHOUSE,
      RolePrevileges.LISTEN_DELETE_PRODUCT,
      RolePrevileges.LISTEN_DELETE_SUPPLY,
      RolePrevileges.LISTEN_DELETE_WAREHOUSE,
    ],
    Saller: [
      // PRODUCT
      RolePrevileges.READ_PRODUCT,
      // SALE
      RolePrevileges.ALL_SALE_OPERATIONS,
      RolePrevileges.ADD_SALE,
      RolePrevileges.READ_SALE,
      RolePrevileges.UPDATE_SALE,
      RolePrevileges.DELETE_SALE,
      // CUSTOMER
      RolePrevileges.ALL_CUSTOMER_OPERATIONS,
      RolePrevileges.ADD_CUSTOMER,
      RolePrevileges.READ_CUSTOMER,
      RolePrevileges.UPDATE_CUSTOMER,
      RolePrevileges.DELETE_CUSTOMER,
      // SUBSCRIPTION
      RolePrevileges.LISTEN_ADD_CATEGORY,
      RolePrevileges.LISTEN_ADD_PRODUCT,
      RolePrevileges.LISTEN_ADD_SALE,
      RolePrevileges.LISTEN_ADD_SUPPLY,
      RolePrevileges.LISTEN_ADD_WAREHOUSE,
      RolePrevileges.LISTEN_EDIT_CATEGORY,
      RolePrevileges.LISTEN_EDIT_PRODUCT,
      RolePrevileges.LISTEN_EDIT_SALE,
      RolePrevileges.LISTEN_EDIT_SUPPLY,
      RolePrevileges.LISTEN_DELETE_CATEGORY,
      RolePrevileges.LISTEN_DELETE_PRODUCT,
      RolePrevileges.LISTEN_DELETE_SALE,
    ],
    Admin: [
      // CATEGORY
      RolePrevileges.ALL_CATEGORY_OPERATIONS,
      RolePrevileges.ADD_CATEGORY,
      RolePrevileges.READ_CATEGORY,
      RolePrevileges.UPDATE_CATEGORY,
      RolePrevileges.DELETE_CATEGORY,
      // PRODUCT
      RolePrevileges.ALL_PRODUCT_OPERATIONS,
      RolePrevileges.ADD_PRODUCT,
      RolePrevileges.READ_PRODUCT,
      RolePrevileges.UPDATE_PRODUCT,
      RolePrevileges.DELETE_PRODUCT,
      // SALES
      RolePrevileges.READ_SALE,
      RolePrevileges.UPDATE_SALE,
      RolePrevileges.DELETE_SALE,
      // WAREHOUSE
      RolePrevileges.ALL_WAREHOUSE_OPERATIONS,
      RolePrevileges.ADD_WAREHOUSE,
      RolePrevileges.READ_WAREHOUSE,
      RolePrevileges.UPDATE_WAREHOUSE,
      RolePrevileges.DELETE_WAREHOUSE,
      // CUSTOMER
      RolePrevileges.ALL_CUSTOMER_OPERATIONS,
      RolePrevileges.ADD_CUSTOMER,
      RolePrevileges.READ_CUSTOMER,
      RolePrevileges.UPDATE_CUSTOMER,
      RolePrevileges.DELETE_CUSTOMER,
      // STAFF
      RolePrevileges.ALL_STAFF_OPERATIONS,
      RolePrevileges.ADD_STAFF,
      RolePrevileges.READ_STAFF,
      RolePrevileges.UPDATE_STAFF,
      RolePrevileges.DELETE_STAFF,
      // SUPPLY
      RolePrevileges.ALL_SUPPLY_OPERATIONS,
      RolePrevileges.ADD_SUPPLY,
      RolePrevileges.READ_SUPPLY,
      RolePrevileges.UPDATE_SUPPLY,
      RolePrevileges.DELETE_SUPPLY,
      // SUBSCRIPTION
      RolePrevileges.LISTEN_ADD_CATEGORY,
      RolePrevileges.LISTEN_ADD_PRODUCT,
      RolePrevileges.LISTEN_ADD_SALE,
      RolePrevileges.LISTEN_ADD_STAFF,
      RolePrevileges.LISTEN_ADD_SUPPLY,
      RolePrevileges.LISTEN_ADD_WAREHOUSE,
      RolePrevileges.LISTEN_EDIT_CATEGORY,
      RolePrevileges.LISTEN_EDIT_PRODUCT,
      RolePrevileges.LISTEN_EDIT_SALE,
      RolePrevileges.LISTEN_EDIT_SUPPLY,
      RolePrevileges.LISTEN_EDIT_WAREHOUSE,
      RolePrevileges.LISTEN_DELETE_CATEGORY,
      RolePrevileges.LISTEN_DELETE_PRODUCT,
      RolePrevileges.LISTEN_DELETE_SALE,
      RolePrevileges.LISTEN_DELETE_STAFF,
      RolePrevileges.LISTEN_DELETE_SUPPLY,
      RolePrevileges.LISTEN_DELETE_WAREHOUSE,
      // ENTERPRISE
      RolePrevileges.ADD_ENTERPRISE,
      RolePrevileges.UPDATE_ENTERPRISE,
      // INITIALIZED_SYSTEM
      RolePrevileges.INITIALIZED_SYSTEM,
    ],
  };
  /*
   * Check if the authenticated staff role includes the any the prelilege, then return the staff,
   */
  if (
    staffPrevileges[authenticatedStaff.role].includes(
      Number(RolePrevileges[previlege])
    )
  ) {
    return authenticatedStaff;
  }
  // else return an error
  throw new GraphQLError(
    `You are not authorized to "${previlege.toString().replace('_', ' ')}".`,
    {
      extensions: {
        code: 'UNAUTHORIZED',
        http: { status: 401 },
      },
    }
  ); // end GraphQLError
}; // end
