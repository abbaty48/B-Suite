import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import {
  genRandom,
  stringToID,
  decodeRSAKey,
  escapeRegExp,
  setRealTimeSubscription,
} from '@server-commons/commons.helpers';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import {
  checkFileExistant,
  deleteDirUploader,
  deleteFileUploader,
  serverFileUploader,
} from '@server-commons/commons.file';
import {
  Staff,
  PaginInput,
  StaffPayload,
  StaffAddInput,
  StaffsPayload,
  StaffAddPayload,
  StaffEditPayload,
  SearchStaffInput,
  StaffDeletePayload,
  SubscriptionActionType,
} from '@server-models/@types/resolver_types';
import { PubSub } from 'graphql-subscriptions';

export class StaffController {
  static staff = async (searchTerm: SearchStaffInput) => {
    return new Promise<StaffPayload>(async (resolve) => {
      try {
        // SEARCH A STAFF BY EITHER (staffID, firstName, lastName, warehouse)
        //AND POPULATE THE STAFF WITH WAREHOUSE
        const { staffID, firstName, lastName, warehouseID, role } = searchTerm;
        // CRITERIA
        const criteria = staffID
          ? { staffID: { $regex: escapeRegExp(staffID), $options: 'si' } }
          : firstName
          ? {
              firstName: { $regex: escapeRegExp(firstName), $options: 'si' },
            }
          : lastName
          ? { lastName: { $regex: escapeRegExp(lastName), $options: 'si' } }
          : warehouseID
          ? {
              warehouse: {
                warehouseID: { $eq: stringToID(warehouseID) },
              },
            }
          : role
          ? { role }
          : {};
        const staff = (await staffModel.findOne(
          {
            $or: [criteria],
          },
          {},
          { populate: 'warehouse' }
        )) as Staff;
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
  };

  static staffs = async (searchTerm: SearchStaffInput, pagin: PaginInput) => {
    return new Promise<StaffsPayload>(async (resolve) => {
      try {
        // SEARCH FILTER
        const { staffID, firstName, lastName, warehouseID, role } =
          searchTerm ?? {};
        // PAGINATE THE STAFFS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        //CRITERIA
        const criteria = staffID
          ? {
              staffID: {
                $regex: escapeRegExp(staffID),
                $options: 'si',
              },
            }
          : firstName
          ? {
              firstName: {
                $regex: escapeRegExp(firstName),
                $options: 'si',
              },
            }
          : lastName
          ? {
              lastName: {
                $regex: escapeRegExp(lastName),
                $options: 'si',
              },
            }
          : warehouseID
          ? {
              warehouse: {
                warehouseID: { $eq: stringToID(warehouseID) },
              },
            }
          : role
          ? { role }
          : {};
        //
        const staffs = (await staffModel.find(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { firstName: sort },
            skip: limit * pageIndex,
            limit,
            populate: 'warehouse',
          }
        )) as Staff[];
        // POPULATE THE STAFF WITH WAREHOUSE
        resolve({
          error: null,
          staffs,
          pagin: {
            sort,
            nextPageIndex: pageIndex + 1,
            currentPageIndex: pageIndex,
            totalPaginated: staffs.length,
            totalDocuments: await staffModel.count(),
          },
        });
      } catch (error) {
        resolve({
          error: error.message,
          staffs: [],
        });
      }
    });
  };

  static addStaff = async (
    addStaffInput: StaffAddInput,
    { config, pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<StaffAddPayload>(async (resolve) => {
      try {
        const { firstName, lastName, email, password, role, featureURI } =
          addStaffInput;

        // CHECK USER VALIDATION
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // check for already manager
          if (
            await staffModel.exists({
              $or: [
                role == StaffRole.Manager ? { role: StaffRole.Manager } : {},
                role == StaffRole.Admin ? { role: StaffRole.Admin } : {},
              ],
            })
          ) {
            return resolve({
              added: false,
              newAdded: null,
              error: `[VALIDATION ERROR]: A staff with a "${role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
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
          ...addStaffInput,
          staffID,
          token,
          password: passwordHash,
        }); // end create
        // IF ADD A PICTURE
        if (featureURI) {
          // UPLOAD THE PICTURE
          const _feature = await serverFileUploader(
            featureURI,
            `./public/uploads/features/staffs/${newStaff.staffID}`,
            config.get('server.domain'),
            `${newStaff.staffID}`
          );
          if (_feature) {
            newStaff.picture = _feature;
            await newStaff.save({ validateBeforeSave: false });
          } // end _feature
        } // end if featureURI
        /** Publish Subscription on LISTEN_ADD_STAFF */
        pubSub.publish('LISTEN_ADD_STAFF', {
          staffAddSubscription: {
            error: null,
            payload: {
              actionBy: authenticatedStaff,
              actionType: SubscriptionActionType.Added,
              actionResult: newStaff,
              timestamp: new Date(),
            }, // end payload
          }, // end staffDeleteSubscription
        }); // end publish

        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalStaffs',
          await staffModel.count()
        );
        // RESOLVE
        resolve({
          error: null,
          added: true,
          newAdded: newStaff as Staff,
        }); // end resolve
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catchc
    }); // end Promise
  };
  // end addStaff
  static editStaff = async (
    editStaffInput: any,
    { config, pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<StaffEditPayload>(async (resolve) => {
      try {
        // TARGET STAFF
        const { staffID, firstName, lastName, email, role } =
          await staffModel.findOne({ staffID: editStaffInput.staffID });
        // CHECK USER VALIDATION
        if (editStaffInput.role) {
          if (
            editStaffInput.role === StaffRole.Manager ||
            editStaffInput.role === StaffRole.Admin
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
                error: `[VALIDATION ERROR]: A staff with a "${editStaffInput.role}" role already exist, only one manager/admin is allowed, please provide a different role.`,
              });
            }
          }
        } // end if input.role
        // IF TO UPDATE THE PASSWORD
        let passwordHash, token: string;
        if (editStaffInput.password) {
          //   BCRYPT STAFF PASSWORD
          passwordHash = await bcrypt.hash(
            editStaffInput.password,
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
          const newEdited = (await staffModel.findOneAndUpdate(
            { staffID: editStaffInput.staffID },
            { ...editStaffInput, password: passwordHash, token }
          )) as Staff;

          /** Publish Subscription on LISTEN_EDIT_STAFF 
             * 
            this.publishSubscribe(
              'LISTEN_EDIT_STAFF',
              newEdited,
              authenticatedStaff as Staff,
              SubscriptionActionType.Edited,
              pubSub
              );
            */

          return resolve({
            edited: true,
            error: null,
            newEdited,
          });
        } // end editStaffInput.password
        // EDIT STAFF
        const newEdited = await staffModel.findOneAndUpdate(
          { staffID: editStaffInput.staffID },
          { ...editStaffInput },
          { runValidators: true, new: true, populate: 'warehouse' }
        ); // end fineOneAndUpdate
        //
        if (editStaffInput.editFeature) {
          const { action, addFeatureURI, removeFeatureByName } =
            editStaffInput.editFeature;
          if (action == 'ADD') {
            // CHECK IF PICTURE ALREADY EXIST, REJECT, OTHERWISE ADD
            if (
              newEdited.picture &&
              (await checkFileExistant(`.${newEdited.picture?.filePath}`))
            ) {
              return resolve({
                edited: true,
                error: null,
                newEdited: newEdited as Staff,
              }); // end resolve;
            } else {
              addFeatureURI.forEach(async (uri: string) => {
                try {
                  // upload each each
                  const _feature = await serverFileUploader(
                    // IMAGEPATH
                    uri,
                    // UPLOAD PATH
                    `./public/uploads/features/staffs/${newEdited.staffID}`,
                    // SERVER URL
                    config.get('server.domain'),
                    // DESTINATED FILE NAME
                    `${newEdited.staffID}`
                  );
                  if (_feature) {
                    newEdited.picture = _feature;
                    await newEdited.save({ validateBeforeSave: false });
                  }
                } catch (error) {}
              }); // end forEach
            } // end
          } else if (action == 'REMOVE') {
            if (
              deleteFileUploader(
                `./public/uploads/features/staffs/${editStaffInput.staffID}`
              )
            ) {
              // delete the file the product feature array
              newEdited.picture = undefined;
              await newEdited.save({ validateBeforeSave: false });
            }
          } // end if EDIT
        } // end editFeature
        /** Publish Subscription on LISTEN_EDIT_STAFF 
           * 
          this.publishSubscribe(
            'LISTEN_EDIT_STAFF',
            newEdited as Staff,
            authenticatedStaff as Staff,
            SubscriptionActionType.Edited,
            pubSub
            );
          */
        // RESOLVE
        resolve({
          edited: true,
          error: null,
          newEdited: newEdited as Staff,
        }); // end resolve
      } catch (error) {
        resolve({
          edited: false,
          newEdited: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end
  };
  // end editStaff
  static deleteStaff = async (
    staffID: string,
    { pubSub, authenticatedStaff }: IResolverContext
  ) => {
    return new Promise<StaffDeletePayload>(async (resolve) => {
      try {
        // TARGET STAFF
        const { role } = await staffModel.findOne({ staffID });
        if (role === StaffRole.Manager || role === StaffRole.Admin) {
          // ONLY ADMIN/MANAGER COULD DELETE A MANAGER/ADMIN
          switch (authenticatedStaff.role) {
            case StaffRole.Saller:
            case StaffRole.Warehouse:
            case StaffRole.Accountant:
              return resolve({
                deleted: false,
                error:
                  '[UNAUTHORIZED ACTION]: Only a admin/manager could delete an admin/manager account.',
              });
          } // end switch
        } // end if role
        // DELETE THE TARGET
        const deletedStaff = await staffModel.findOneAndRemove({ staffID });
        // DELETE STAFF PICTURE
        await deleteDirUploader(`./public/uploads/features/staffs/${staffID}`);
        /** Publish Subscription on LISTEN_DELETE_STAFF */
        pubSub.publish('LISTEN_DELETE_STAFF', {
          staffDeleteSubscription: {
            error: null,
            payload: {
              timestamp: new Date(),
              actionBy: authenticatedStaff,
              actionResult: deletedStaff,
              actionType: SubscriptionActionType.Deleted,
            }, // end payload
          }, // end staffDeleteSubscription
        }); // end publish
        setRealTimeSubscription(
          pubSub,
          'LISTEN_REALTIME_STORE',
          'totalStaffs',
          await staffModel.count()
        );
        // RESOLVE
        resolve({
          deleted: true,
          error: null,
        });
      } catch (error) {
        // RESOLVE
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        });
      }
    }); // end promise
  }; // end deleteStaff

  /** Publish Subscription on LISTEN_EDIT_STAFF */
  private static publishSubscribe(
    listen: string,
    actionResult: Staff,
    actionBy: Staff,
    actionType: SubscriptionActionType,
    pubSub: PubSub
  ) {
    pubSub.publish(listen, {
      // edit here while using staffEditSubscription, it should be something else,
      // a leave this for feature use, maybe if it would be use in staffEdit
      staffEditSubscription: {
        error: null,
        payload: {
          actionBy,
          actionType,
          actionResult,
          timestamp: new Date(),
        }, // end payload
      }, // end staffDeleteSubscription
    }); // end publish
  } // end publishSubscribe
} // end StaffResolver
