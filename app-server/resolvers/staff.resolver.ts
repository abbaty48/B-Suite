import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { mongodbService } from '@server-datasources/mongodb';
import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import staffRoleAuthorization from '@server-commons/auths/authorizationMiddleware';
import {
  decodeRSAKey,
  genRandom,
  stringToID,
  escapeRegExp,
} from '@server-commons/helpers';
import {
  IStaffPayload,
  IStaffsPayload,
  IStaffAddPayload,
  IStaffEditPayload,
  IStaffDeletePayload,
  IStaff,
  IStaffSearchFilter,
} from '@server-databases/mongodb/interfaces/IStaff';
import { Filter, IFilters } from '@server-databases/mongodb/interfaces/IFilter';
import { RolePrevileges } from '@server-databases/mongodb/enums/RolePrevilage';
import { IResolverContext } from '@server-commons/models/interfaces/IResolverContext';

mongodbService();

export const StaffResolver = {
  staff: async (
    searchFilter: IStaffSearchFilter,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffPayload>(async (resolve) => {
      try {
        //
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_STAFF
        );
        // SEARCH A STAFF BY EITHER (staffID, firstName, lastName, warehouse)
        //AND POPULATE THE STAFF WITH WAREHOUSE
        const { staffID, firstName, lastName, warehouseID } = searchFilter;
        const staff = await staffModel.findOne(
          {
            $or: [
              { staffID: { $regex: escapeRegExp(staffID), $options: 'su' } },
              { firstName: { $eq: escapeRegExp(firstName), $options: 'si' } },
              { lastName: { $eq: escapeRegExp(lastName), $options: 'si' } },
              warehouseID
                ? {
                    warehouse: {
                      warehouseID: { $eq: stringToID(warehouseID) },
                    },
                  }
                : {},
            ],
          },
          {},
          { populate: 'user' }
        );
        resolve({
          error: null,
          staff,
        });
      } catch (error) {
        resolve({
          error: error.message,
          staff: null,
        });
      }
    });
  },
  staffs: async (
    searchFilter: IStaffSearchFilter,
    filter: IFilters,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffsPayload>(async (resolve) => {
      try {
        // AUTHENTICATED
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.READ_STAFF
        );
        // SEARCH FILTER
        const { staffID, firstName, lastName, warehouseID } =
          searchFilter ?? {};
        // PAGINATE THE STAFFS
        const sort = filter.sort ?? Filter.sort,
          limit = filter.limit ?? Filter.limit,
          pageIndex = filter.pageIndex ?? Filter.pageIndex;
        const paginatedStaffs = await staffModel
          .find({
            $or: [
              staffID
                ? { staffID: { $regex: escapeRegExp(staffID), $options: 'si' } }
                : {},
              firstName
                ? {
                    firstName: {
                      $regex: escapeRegExp(firstName),
                      $options: 'si',
                    },
                  }
                : {},
              lastName
                ? {
                    lastName: {
                      $regex: escapeRegExp(lastName),
                      $options: 'si',
                    },
                  }
                : {},
              warehouseID
                ? {
                    warehouse: {
                      warehouseID: { $eq: stringToID(warehouseID) },
                    },
                  }
                : {},
            ],
          })
          .sort({ firstName: sort })
          .skip(limit * pageIndex)
          .limit(limit);
        // POPULATE THE STAFF WITH WAREHOUSE
        const staffs = await staffModel.populate(paginatedStaffs, 'user');
        resolve({
          error: null,
          staffs,
          filters: {
            sort,
            total: paginatedStaffs.length,
            nextPageIndex: pageIndex + 1,
            currentPageIndex: pageIndex,
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          staffs: [],
        });
      }
    });
  },
  addStaff: async (
    inputs: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffAddPayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.ADD_STAFF
        );

        const { firstName, lastName, email, password, role } = inputs;

        // CHECK USER VALIDATION
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // check for already manager
          if (
            await staffModel.exists({
              $or: [{ role: StaffRole.Manager }, { role: StaffRole.Admin }],
            })
          ) {
            return resolve({
              added: false,
              newAdded: null,
              error: `A staff with a "${role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
            });
          }
        }
        //   GENERATE STAFF UNIQUE ID
        const staffID = `ID${genRandom().slice(0, 5).toUpperCase()}`;
        //   BCRYPT STAFF PASSWORD
        const passwordHash = await bcrypt.hash(
          password,
          await bcrypt.genSalt()
        );
        //   GENERATE TOKEN
        const token = JWT.sign(
          {
            staffID,
            firstName,
            lastName,
            email,
            role,
          },
          decodeRSAKey(config.get('jwt.private')),
          { algorithm: 'HS512' }
        );

        const newStaff = await staffModel.create({
          ...inputs,
          staffID,
          token,
          password: passwordHash,
        });
        resolve({
          error: null,
          added: true,
          newAdded: newStaff,
        });
      } catch (error) {
        resolve({
          error: error.message,
          added: false,
          newAdded: null,
        });
      }
    }); // end Promise
  }, // end addStaff
  editStaff: async (
    inputs: any,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffEditPayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.UPDATE_STAFF
        );
        // TARGET STAFF
        const { staffID, firstName, lastName, email, role } =
          await staffModel.findOne({ staffID: inputs.staffID });
        // CHECK USER VALIDATION
        if (inputs.role) {
          if (
            inputs.role === StaffRole.Manager ||
            inputs.role === StaffRole.Admin
          ) {
            // check for already manager
            if (
              await staffModel.exists({
                $or: [{ role: StaffRole.Manager }, { role: StaffRole.Admin }],
              })
            ) {
              return resolve({
                edited: false,
                newEdited: null,
                error: `A staff with a "${inputs.role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
              });
            }
          }
        } // end if input.role
        // IF TO UPDATE THE PASSWORD
        let passwordHash, token: string;
        if (inputs.password) {
          //   BCRYPT STAFF PASSWORD
          passwordHash = await bcrypt.hash(
            inputs.password,
            await bcrypt.genSalt()
          );

          //   GENERATE TOKEN
          token = JWT.sign(
            {
              staffID,
              firstName,
              lastName,
              email,
              role,
            },
            decodeRSAKey(config.get('jwt.private')),
            { algorithm: 'HS512' }
          );

          // UPDATE WITH PASSWORD
          const newEdited = await staffModel.findOneAndUpdate(
            { staffID: inputs.staffID },
            { ...inputs, password: passwordHash, token }
          );

          return resolve({
            edited: true,
            error: null,
            newEdited,
          });
        } // end inputs.password
        // EDIT STAFF
        const newEdited = await staffModel.findOneAndUpdate(
          { staffID: inputs.staffID },
          { ...inputs }
        );
        // RESOLVE
        resolve({
          edited: true,
          error: null,
          newEdited,
        });
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: error.message,
        });
      }
    }); // end
  }, // end editStaff
  deleteStaff: async (
    staffID: string,
    { request, response, config }: IResolverContext
  ) => {
    return new Promise<IStaffDeletePayload>(async (resolve) => {
      try {
        // AUTHORIZE ONLY A MANAGER/ACCOUTANT/ADMIN
        const authStaff = await staffRoleAuthorization(
          request,
          response,
          config.get('jwt.private'),
          RolePrevileges.DELETE_STAFF
        );
        // TARGET STAFF
        const { role } = await staffModel.findOne({ staffID });
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // ONLY ADMIN/MANAGER COULD DELETE A MANAGER/ADMIN
          switch (authStaff.role) {
            case StaffRole.Saller:
            case StaffRole.Warehouse:
            case StaffRole.Accountant:
              return resolve({
                deleted: false,
                error:
                  'UNAUTHORIZED ACTION, only a admin/manager could delete an admin/manager account.',
              });
          } // end switch
        } // end if role
        // DELETE THE TARGET
        await staffModel.findOneAndRemove({ staffID });
        // RESOLVE
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        // RESOLVE
        resolve({
          deleted: false,
          error: error.message,
        });
      }
    }); // end promise
  }, // end deleteStaff
}; // end StaffResolver
