import { Model, Schema, UpdateQuery, model, models } from 'mongoose';
import { FeatureSchema } from '@server-databases/mongodb/schema_feature';
import { warehouseModel } from '@server-databases/mongodb/schema_warehouse';

import { StaffRole } from '@server-databases/mongodb/enums/Role';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

const StaffSchema = new Schema<IStaff>(
  {
    staffID: { type: 'string', _id: true, required: true },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    otherName: { type: 'string', required: false },
    email: { type: 'string', required: false },
    role: { type: 'string', enum: StaffRole, required: true },
    phoneNumber: { type: 'string', required: false },
    address: { type: 'string', required: false },
    picture: { type: FeatureSchema, required: false },
    password: { type: 'string', required: true },
    token: { type: 'string', required: true },
    warehouseID: {
      type: 'string',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    collection: 'staffs',
    timestamps: {
      createdAt: true,
      updatedAt: true,
      currentTime: () => new Date().getTime(),
    },
  }
);

StaffSchema.virtual('warehouse', {
  ref: 'warehouse',
  localField: 'warehouseID',
  foreignField: 'warehouseID',
});

StaffSchema.pre('findOneAndUpdate', function () {
  const _u = this.getUpdate() as UpdateQuery<IStaff>;
  _upsertStaffID(_u.warehouseID, _u.staffID);
});

StaffSchema.pre('save', async function (this: IStaff) {
  _upsertStaffID(this.warehouseID, this.staffID);
});

const _upsertStaffID = async (warehouseID: string, staffID: string) => {
  if (warehouseID) {
    await warehouseModel.findOneAndUpdate(
      { warehouseID, staffIDs: { $ne: staffID } },
      { $push: { staffIDs: staffID } },
      { new: true, upsert: false }
    ); // end findOneAndUpdate
  } // end warehouseID
};

export const staffModel =
  (models.staff as Model<IStaff>) || model<IStaff>('staff', StaffSchema);
