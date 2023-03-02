import { SORT } from '@server-databases/mongodb/enums/Sort';

export interface IFilters {
  limit: number;
  pageIndex: number;
  sort: SORT;
}

export const Filter: IFilters = {
  limit: 20,
  pageIndex: 0,
  sort: SORT.ASCENDING,
};
