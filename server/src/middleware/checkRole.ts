import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

export const checkRole = (roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};