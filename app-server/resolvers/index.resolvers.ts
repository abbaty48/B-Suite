import { ICategory } from '@server-databases/mongodb/interfaces/ICategory';
import { CategoryResolver } from '@server-resolvers/category.resolver';

export const resolvers = {
  Query: {
    categories: async (_: any): Promise<ICategory[]> => {
      return await CategoryResolver.categories();
    },
  },
  Mutation: {
    addCategory: async (_: any, { category }: any) => {
      return await CategoryResolver.addCategory(category);
    },
    editCategory: async (_: any, { oldCategory, newCategory }: any) => {
      return await CategoryResolver.editCategory(oldCategory, newCategory);
    },
    deleteCategory: async (_: any, { category }: any) => {
      return await CategoryResolver.deleteCategory(category);
    },
  },
};
