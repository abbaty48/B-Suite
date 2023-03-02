import Jwt from 'jsonwebtoken';
import { decodeRSAKey } from '@server-commons/helpers';
import { staffModel } from '@server-databases/mongodb/schema_staff';
import { IStaff } from '@server-databases/mongodb/interfaces/IStaff';

export const staffVerifyToken = async (
  request: any,
  response: any,
  privateKey: any
): Promise<IStaff> => {
  try {
    // check the Authorization key existence
    const authorizationKey = request.get('Authorization');

    if (!authorizationKey) {
      throw new Error(
        'Authorization bearer not found, authentication is required, provide your token.'
      );
    }

    // check the token validity
    const token = authorizationKey.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    // sign the token
    // let verifyToken: any;
    try {
      Jwt.verify(token, decodeRSAKey(privateKey), {
        algorithms: ['HS512'],
      });
    } catch (error: any) {
      throw new Error('Unable to verify token: ' + error.message);
    } // end catch
    // get staff info
    // const staff = await (staffModel as Model<IStaff>).findOne<IStaff>({
    const staff = await staffModel.findOne<IStaff>({ token });
    // if staff is not found
    if (!staff) {
      throw new Error(
        'Invalid token provided, staff not found with the provided token.'
      );
    }
    return staff;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
