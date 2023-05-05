import { escapeRegExp, genRandom } from '@server-commons/commons.helpers';
import { customerModel } from '@server-databases/mongodb/schema_customer';
import {
  Customer,
  PaginInput,
  CustomerPayload,
  CustomerAddInput,
  CustomersPayload,
  CustomerAddPayload,
  CustomerEditPayload,
  SearchCustomerInput,
  CustomerDeletePayload,
  CustomerDeleteInput,
  CustomerEditInput,
} from '@server-models/@types/resolver_types';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';

export class CustomerController {
  static customer = async (searchTerm: SearchCustomerInput) => {
    return new Promise<CustomerPayload>(async (resolve) => {
      try {
        // SEARCH A CUSTOMER BY EITHER (name, email, customerID, address, dateOfBirth)
        //AND POPULATE THE STAFF WITH WAREHOUSE
        const { name, email, customerID, address, dateOfBirth, beneficiaries } =
          searchTerm ?? {};
        // CRITERIA
        const criteria = customerID
          ? {
              customerID: {
                $eq: customerID,
              },
            }
          : name
          ? {
              name: {
                $eq: name,
              },
            }
          : email
          ? {
              email: {
                $eq: email,
              },
            }
          : address
          ? {
              address: {
                $eq: address,
              },
            }
          : dateOfBirth
          ? {
              'metas.dateOfBirth': {
                $regex: escapeRegExp(dateOfBirth),
                $options: 'si',
              },
            }
          : beneficiaries !== undefined
          ? {
              beneficiary: beneficiaries,
            }
          : {};
        const customer = await customerModel.findOne<Customer>(
          {
            $or: [criteria],
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
  };
  static customers = async (
    searchTerm: SearchCustomerInput,
    pagin: PaginInput
  ) => {
    return new Promise<CustomersPayload>(async (resolve) => {
      try {
        const { name, email, customerID, address, dateOfBirth, beneficiaries } =
          searchTerm ?? {};
        // PAGINATE THE CUSTOMER
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;

        // CRITERIA
        const criteria = customerID
          ? {
              customerID: {
                $eq: customerID,
              },
            }
          : name
          ? {
              name: {
                $eq: name,
              },
            }
          : email
          ? {
              email: {
                $eq: email,
              },
            }
          : address
          ? {
              address: {
                $eq: address,
              },
            }
          : dateOfBirth
          ? {
              'metas.dateOfBirth': {
                $regex: escapeRegExp(dateOfBirth),
                $options: 'si',
              },
            }
          : beneficiaries !== undefined
          ? {
              beneficiary: beneficiaries,
            }
          : {};
        const customers = await customerModel.find<Customer>(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { name: sort },
            skip: limit * pageIndex,
            limit,
            populate: {
              path: 'warehouse purchases',
              populate: 'staff products',
            },
          } // end options
        ); // end find
        //
        resolve({
          error: null,
          customers,
          pagins: {
            sort,
            currentPageIndex: pageIndex,
            nextPageIndex: pageIndex + 1,
            totalPaginated: customers.length,
            totalDocuments: await customerModel.count(),
          },
        }); // end resolve
      } catch (error) {
        resolve({
          error: `[INTERNAL ERROR]: ${error.message}`,
          customers: null,
          pagins: null,
        }); // end resolve
      } // end catch
    }); // end Promise
  };
  static addCustomer = async (addCustomerInput: CustomerAddInput) => {
    return new Promise<CustomerAddPayload>(async (resolve) => {
      try {
        const customerID = `CIN${genRandom().slice(0, 5).toUpperCase()}`;
        const newAdded = await customerModel.create({
          customerID,
          ...addCustomerInput,
        });
        resolve({
          added: true,
          error: null,
          newAdded: await newAdded.populate<Customer>({
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
  };
  static editCustomer = async (editCustomerInput: CustomerEditInput) => {
    return new Promise<CustomerEditPayload>(async (resolve) => {
      try {
        const newEdited = await customerModel.findOneAndUpdate<Customer>(
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
  };
  static deleteCustomer = async ({
    customerID,
    warehouseID,
  }: CustomerDeleteInput) => {
    return new Promise<CustomerDeletePayload>(async (resolve) => {
      try {
        if (warehouseID) {
          await customerModel.findOneAndRemove<Customer>({
            $and: [{ customerID }, { warehouseID }],
          });
        } else {
          await customerModel.findOneAndRemove<Customer>({ customerID });
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
  };
}
