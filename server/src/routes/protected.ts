import express, { Request, Response } from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { checkRole } from '../middleware/checkRole';

const router = express.Router();

// Admin Dashboard - Only Admin can access
router.get('/admin', authenticateJWT, checkRole(['Admin']), (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Admin Dashboard',
    user: req.user
  });
});

// Editor Dashboard - Admin and Editor can access
router.get('/editor', authenticateJWT, checkRole(['Admin', 'Editor']), (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Editor Dashboard',
    user: req.user
  });
});

// Viewer Dashboard - All authenticated users can access
router.get('/viewer', authenticateJWT, checkRole(['Admin', 'Editor', 'Viewer']), (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Viewer Dashboard',
    user: req.user
  });
});

export default router;