import { Request, Response, Express, NextFunction } from 'express';

export const errorMiddlwares = (app: Express, __dirname: string) => {
  // ERROR HANDLER
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    const { status } = err;
    res.status(status).json(err);
  });
};
