import path from 'path';
import { Request, Response, NextFunction } from 'express';

// export const assetMiddlwares = (app: Express, __dirname: string) => {
export const assetMiddlwares =
  (__dirname: string) => (req: Request, res: Response, next: NextFunction) => {
    /*** SERVE PRODUCT FEATURE IMAGES*/
    req.app.use(
      '/v1/public/uploads/features/products/:productID/:featurename',
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
    req.app.use(
      '/v1/public/uploads/features/staffs/:staffID/:featurename',
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

    return next();
  };
