import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload extends jwt.JwtPayload {
  id: string;
  role: string;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.sendStatus(401);
      return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_jwt_secret',
      (err, decoded) => {
        if (err) {
          res.sendStatus(403);
          return;
        }

        req.user = decoded as UserPayload;
        next();
      }
    );
  } catch (error) {
    res.sendStatus(403);
    return;
  }
};