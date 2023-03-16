import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import { staffVerifyToken } from '@server-commons/auths/staffJWTAuthenticationMiddleware';

interface IStaffPrevilege {
  Admin: RolePrevileges[];
  Manager: RolePrevileges[];
  Saller: RolePrevileges[];
  Warehouse: RolePrevileges[];
  Accountant: RolePrevileges[];
  [index: string]: RolePrevileges[];
}

const staffRoleAuthorization = async (
  req: any,
  res: any,
  privateKey: any,
  previlege: RolePrevileges
): Promise<IStaff> => {
  try {
    const authenticatedStaff = await staffVerifyToken(req, res, privateKey);

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
        // ENTERPRISE
        RolePrevileges.ADD_ENTERPRISE,
        RolePrevileges.UPDATE_ENTERPRISE,
        // INITIALIZED_SYSTEM
        RolePrevileges.INITIALIZED_SYSTEM,
      ],
    };

    if (staffPrevileges[authenticatedStaff.role].includes(previlege)) {
      return authenticatedStaff;
    }

    throw new Error(
      `[UNAUTHORIZED]: you are not authorized to "${RolePrevileges[
        previlege
      ].replace('_', ' ')}".`
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default staffRoleAuthorization;
