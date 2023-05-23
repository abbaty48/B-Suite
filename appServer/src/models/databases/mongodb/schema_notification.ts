import { Model, Schema, model, models } from 'mongoose';
import { INotifcation } from '@server-models/databases/mongodb/interfaces/INotification';
import {
  NotificationStatus,
  NotificationType,
} from '@/appServer/src/models/databases/mongodb/enums/Notification';

const notificationSchema = new Schema<INotifcation>(
  {
    id: { type: 'string', required: true },
    title: { type: 'string', required: true },
    dateTime: { type: 'date', required: true },
    description: { type: 'string', required: true },
    type: { type: 'string', enum: NotificationType, required: true },
    status: { type: 'string', enum: NotificationStatus, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: '_notifications',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
  }
);

export const notificationModel =
  (models.notifications as Model<INotifcation>) ||
  model<INotifcation>('notification', notificationSchema);
