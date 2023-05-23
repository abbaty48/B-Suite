import { Document } from 'mongoose';
import {
  NotificationType,
  NotificationStatus,
} from '@/appServer/src/models/databases/mongodb/enums/Notification';

export interface INotifcation extends Document {
  id: string;
  title: string;
  dateTime: Date;
  description: string;
  type: NotificationType;
  status: NotificationStatus;
}
