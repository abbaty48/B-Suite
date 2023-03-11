import {
  ICustomerPayload,
  ICustomersPayload,
  ICustomerAddPayload,
  ICustomerEditPayload,
  ICustomerDeletePayload,
} from '@server-databases/mongodb/interfaces/ICustomer';
import { Filter } from '@server-databases/mongodb/interfaces/IFilter';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

import { escapeRegExp, genRandom } from '@server-commons/helpers';
import { customerModel } from '@server-databases/mongodb/schema_customer';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';

export const CustomerResolver = {
  customer: async (
    searchFilter: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICustomerPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_CUSTOMER
        ); //end staffRoleAuthorization
        // SEARCH A CUSTOMER BY EITHER (name, email, customerID, address, dateOfBirth)
        //AND POPULATE THE STAFF WITH WAREHOUSE
        const { name, email, customerID, address, dateOfBirth, beneficiaries } =
          searchFilter ?? {};
        const customer = await customerModel.findOne(
          {
            $or: [
              customerID
                ? {
                    customerID: {
                      $eq: customerID,
                    },
                  }
                : {},
              name
                ? {
                    name: {
                      $eq: name,
                    },
                  }
                : {},
              email
                ? {
                    email: {
                      $eq: email,
                    },
                  }
                : {},
              address
                ? {
                    address: {
                      $eq: address,
                    },
                  }
                : {},
              dateOfBirth
                ? {
                    'metas.dateOfBirth': {
                      $regex: escapeRegExp(dateOfBirth),
                      $options: 'si',
                    },
                  }
                : {},
              beneficiaries !== undefined
                ? {
                    beneficiary: beneficiaries,
                  }
                : {},
            ],
          },
          {},
          {
            populate: {
              path: 'warehouse purchases',
              populate: 'staff products',
            },
          }
        );
        resolve({
          error: null,
          customer,
        });
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          customer: null,
        }); // end resolve
      } // end catch
    }); // end Promise
  },
  customers: async (
    searchFilter: any,
    filter: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICustomersPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_CUSTOMER
        ); //end staffRoleAuthorization
        const { name, email, customerID, address, dateOfBirth, beneficiaries } =
          searchFilter ?? {};
        // PAGINATE THE CUSTOMER
        const sort = filter?.sort ?? Filter.sort,
          limit = filter?.limit ?? Filter.limit,
          pageIndex = filter?.pageIndex ?? Filter.pageIndex;
        const customers = await customerModel
          .find(
            {
              $or: [
                customerID
                  ? {
                      customerID: {
                        $eq: customerID,
                      },
                    }
                  : {},
                name
                  ? {
                      name: {
                        $regex: escapeRegExp(name),
                        $options: 'si',
                      },
                    }
                  : {},
                email
                  ? {
                      email: {
                        $regex: escapeRegExp(email),
                        $options: 'si',
                      },
                    }
                  : {},
                address
                  ? {
                      address: {
                        $regex: escapeRegExp(address),
                        $options: 'si',
                      },
                    }
                  : {},
                dateOfBirth
                  ? {
                      'metas.dateOfBirth': {
                        $regex: escapeRegExp(dateOfBirth),
                        $options: 'si',
                      },
                    }
                  : {},
                beneficiaries !== undefined
                  ? {
                      beneficiary: beneficiaries,
                    }
                  : {},
              ],
            },
            {},
            {
              populate: {
                path: 'warehouse purchases',
                populate: 'staff products',
              },
            }
          )
          .sort({ name: sort })
          .skip(limit * pageIndex)
          .limit(limit);
        //
        resolve({
          error: null,
          customers,
          filters: {
            sort,
            totalFilter: customers.length,
            nextPageIndex: pageIndex + 1,
            currentPageIndex: pageIndex,
            totalDocuments: await customerModel.count(),
          },
        });
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          customers: null,
          filters: null,
        }); // end resolve
      } // end catch
    }); // end Promise
  },
  addCustomers: async (
    addCustomerInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICustomerAddPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_CUSTOMER
        ); //end staffRoleAuthorization

        const customerID = `CIN${genRandom().slice(0, 5).toUpperCase()}`;
        const newAdded = await customerModel.create({
          customerID,
          ...addCustomerInput,
        });
        resolve({
          added: true,
          error: null,
          newAdded: await newAdded.populate({
            path: 'warehouse purchases',
            populate: 'staff products',
          }),
        });
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[INTERNAL ERROR]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  },
  editCustomers: async (
    editCustomerInput: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICustomerEditPayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_CUSTOMER
        ); //end staffRoleAuthorization
        const newEdited = await customerModel.findOneAndUpdate(
          {
            customerID: editCustomerInput.customerID,
          },
          { ...editCustomerInput },
          {
            runValidators: true,
            new: true,
            populate: {
              path: 'warehouse purchases',
              populate: 'staff products',
            },
          }
        );
        resolve({
          error: null,
          edited: true,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[INTERNAL ERROR]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  },
  deleteCustomers: async (
    customerID: string,
    warehouseID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<ICustomerDeletePayload>(async (resolve) => {
      try {
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_CUSTOMER
        ); //end staffRoleAuthorization

        if (warehouseID) {
          await customerModel.findOneAndRemove({
            $and: [{ customerID }, { warehouseID }],
          });
        } else {
          await customerModel.findOneAndRemove({ customerID });
        }
        resolve({
          error: null,
          deleted: true,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[INTERNAL ERROR]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  },
};
