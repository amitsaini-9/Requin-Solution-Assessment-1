import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types/auth';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const user = req.user as UserPayload;

      if (!user || !roles.includes(user.role)) {
        res.status(403).json({ message: 'Access denied' });
        return;
      }

      next();
    } catch (error) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
  };
};