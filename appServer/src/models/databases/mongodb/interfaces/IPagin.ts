import { SORT } from '@server-databases/mongodb/enums/Sort';

export interface IPagin {
  sort: SORT;
  limit: number;
  pageIndex: number;
}

export const Pagin: IPagin = {
  limit: 20,
  pageIndex: 0,
  sort: SORT.ASCENDING,
};
