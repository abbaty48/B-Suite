import { Request, Response, NextFunction } from 'express';

export const errorMiddlwares =
  (__dirname: string) => (req: Request, res: Response, next: NextFunction) => {
    // ERROR HANDLER
    req.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }
      const { status } = err;
      res.status(status).json(err);
    });

    return next();
  };
