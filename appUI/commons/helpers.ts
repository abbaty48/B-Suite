import { ILocalStaff } from '@ui-commons/interfaces/istaff';

export const getlStaffs = (): ILocalStaff[] | null =>
  JSON.parse(localStorage.getItem('_app_users')) as ILocalStaff[] | null;
//
export const getStaff = (staffID: string): ILocalStaff | null =>
  getlStaffs()?.find((_staff) => _staff.staffID === staffID) ?? null;
//
export const setLocalStaff = (staff: ILocalStaff) => {
  let lStaffs = getlStaffs();
  if (lStaffs) {
    // if user does not exist then add the user
    if (lStaffs.findIndex((u) => u.staffID === staff.staffID) === -1) {
      lStaffs.push(staff);
    } else {
      return staff;
    }
    // update the local storage
    localStorage.setItem('_app_users', JSON.stringify(lStaffs));
  } else {
    // if the first user to sign-in, then add to the array
    lStaffs = new Array<ILocalStaff>();
    lStaffs.push(staff);
    // update the local storage
    localStorage.setItem('_app_users', JSON.stringify(lStaffs));
  }
};
