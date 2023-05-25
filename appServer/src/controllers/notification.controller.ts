import {
  PaginInput,
  Notification,
  NotificationStatus,
  NotificationsPayload,
  NotificationAddInput,
  NotificationAddPayload,
  NotificationSearchInput,
  NotificationDeletePayload,
  NotificationAsReadPayload,
} from '@server-models/@types/resolver_types';
import { genRandom } from '@server-commons/commons.helpers';
import { Pagin } from '@server-models/databases/mongodb/interfaces/IPagin';
import { notificationModel } from '@server-models/databases/mongodb/schema_notification';

export class NotificationController {
  // NOTIFICATION
  static notifications = async (
    searchTerm: NotificationSearchInput,
    pagin: PaginInput
  ) => {
    return new Promise<NotificationsPayload>(async (resolve) => {
      try {
        const { id, title, time, date, status, type } = searchTerm ?? {};
        // PAGINATE THE PRODUCTS
        const sort = pagin?.sort ?? Pagin.sort,
          limit = pagin?.limit ?? Pagin.limit,
          pageIndex = pagin?.pageIndex ?? Pagin.pageIndex;
        // CRITERIA
        const criteria = id
          ? { id: { $eq: id } }
          : title
          ? { title: { $eq: title } }
          : date
          ? { dateTime: date }
          : time
          ? { dateTime: time }
          : status
          ? { status: { $eq: status } }
          : type
          ? { type: { $eq: type } }
          : {};

        //
        const notifications = await notificationModel.find<Notification>(
          {
            $or: [criteria],
          },
          {},
          {
            sort: { date: sort },
            skip: limit * pageIndex,
            limit,
          }
        );
        resolve({
          error: null,
          notifications,
          pagins: {
            sort,
            currentPageIndex: pageIndex,
            totalPaginated: notifications.length,
            totalDocuments: await notificationModel.count(),
            nextPageIndex: notifications.length > 0 ? pageIndex + 1 : 0,
          },
        });
      } catch (error) {
        resolve({
          pagins: null,
          notifications: null,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end resolve
  };
  //
  static addNotification = async (
    notificationAddInput: NotificationAddInput
  ) => {
    return new Promise<NotificationAddPayload>(async (resolve) => {
      try {
        const notification = (await notificationModel.create({
          id: `NID${genRandom()}`,
          ...notificationAddInput,
        })) as Notification;

        resolve({
          error: null,
          added: true,
          newAdded: notification,
        }); // end resolve
      } catch (error) {
        resolve({
          added: false,
          newAdded: null,
          error: `[EXCEPTION]: ${error.message}`,
        });
      } // end catch
    }); // end promise
  };
  //
  static deleteNotification = async (id: string) => {
    return new Promise<NotificationDeletePayload>(async (resolve) => {
      try {
        await notificationModel.findOneAndRemove({
          id,
        });

        resolve({ deleted: true, error: null });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  };
  // CLEAR NOTIFICATION(S)
  static clearNotifications = async (deleteTerm: NotificationSearchInput) => {
    return new Promise<NotificationDeletePayload>(async (resolve) => {
      try {
        const { id, title, time, date, status, type } = deleteTerm ?? {};
        // CRITERIA
        const criteria = id
          ? { id: { $eq: id } }
          : title
          ? { title: { $eq: title } }
          : date
          ? { date: { $eq: date } }
          : time
          ? { date: { $regex: time, $options: 'si' } }
          : status
          ? { status: { $eq: status } }
          : type
          ? { type: { $eq: type } }
          : {}; // clear all

        //
        const deleteResult = await notificationModel.deleteMany({
          $or: [criteria],
        });
        resolve({
          error: null,
          deleted: deleteResult.deletedCount > 0,
        });
      } catch (error) {
        resolve({
          deleted: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end resolve
  };
  // MARK AS READ
  static markAsReadNotificaion = async (id: string) => {
    return new Promise<NotificationAsReadPayload>(async (resolve) => {
      try {
        await notificationModel.findOneAndUpdate<Notification>(
          {
            id,
          },
          { $set: { status: NotificationStatus.Read } }
        );
        resolve({ marked: true, error: null });
      } catch (error) {
        resolve({
          marked: false,
          error: `[EXCEPTION]: ${error.message}`,
        }); // end resolve
      } // end catch
    }); // end Promise
  };
}
