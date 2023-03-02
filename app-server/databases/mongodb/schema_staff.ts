import { Model, Schema, Types, model, models } from 'mongoose';
import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

export const staffModel =
  (models.staff as Model<IStaff>) ||
  model<IStaff>(
    'staff',
    new Schema<IStaff>(
      {
        staffID: { type: 'string', _id: true, required: true },
        firstName: { type: 'string', required: true },
        lastName: { type: 'string', required: true },
        otherName: { type: 'string', required: false },
        email: { type: 'string', required: false },
        role: { type: 'string', enum: StaffRole, required: true },
        phoneNumber: { type: 'string', required: false },
        address: { type: 'string', required: false },
        passport: { type: 'string', required: false },
        password: { type: 'string', required: true },
        token: { type: 'string', required: true },
        warehouse: { type: Types.ObjectId, ref: 'warehouse', required: false },
      },
      {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
    )
  );
