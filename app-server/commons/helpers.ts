import { ObjectId } from 'mongodb';

export const escapeRegExp = (s: string) =>
  s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export const stringToID = (s: string) =>
  ObjectId.isValid(s) ? new ObjectId(s) : null;

export const decodeRSAKey = (s: string): string => {
  return Buffer.from(s, 'base64').toString('ascii');
};

export const extractToken = (authorization: string): string => {
  const _ = authorization.split(' '); // split the authorization
  return _[1]; // get the token string from the authorization string
};

export const genRandom = (radix: number = 36) =>
  Math.floor(Math.random() * Date.now()).toString(radix);
