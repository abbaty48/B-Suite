import { Staff } from '@/appServer/src/models/@types/resolver_types';
import { ILocalStaff } from '@ui-commons/interfaces/istaff';

export const currentUser: Staff = JSON.parse(
  localStorage.getItem('_app_current_user')
);

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

export const getStaffIcon = (role: string) => {
  switch (role) {
    case 'Admin':
      return '--icon-staff-admin';
    case 'Manager':
      return '--icon-staff-manager';
    case 'Seller':
    case 'Warehouse':
      return '--icon-staff';
    case 'Accountant':
      return '--icon-staff-accountant';
  }
};
