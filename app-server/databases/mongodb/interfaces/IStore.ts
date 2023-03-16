import { IEnterprise } from '@server-databases/mongodb/interfaces/IEnterprise';

export interface IStore {
  _doc: IStore;
  enterPrise: IEnterprise;
  _sysInitialized: boolean;
  _enterpriseInitialized: boolean;
}
