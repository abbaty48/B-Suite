import path from 'path';
import { Request, Response, Express } from 'express';

export const assetMiddlwares = (app: Express, __dirname: string) => {
  /*** SERVE PRODUCT FEATURE IMAGES*/
  app.use(
    '/graphql/public/uploads/features/products/:productID/:featurename',
    (req: Request, res: Response) => {
      res.sendFile(
        path.join(
          __dirname,
          `/public/uploads/features/products/${String(
            req.params.productID
          ).toUpperCase()}/${req.params.featurename}`
        )
      );
    }
  );
  /** SERVE STAFF FEATURE IMAGES */
  app.use(
    '/graphql/public/uploads/features/staffs/:staffID/:featurename',
    (req: Request, res: Response) => {
      res.sendFile(
        path.join(
          __dirname,
          `/public/uploads/features/staffID/${String(
            req.params.staffID
          ).toUpperCase()}/${req.params.featurename}`
        )
      );
    }
  );
};
