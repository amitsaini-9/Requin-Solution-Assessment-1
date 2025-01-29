import express from 'express';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { checkRole } from '../middleware/checkRole';
import { UserPayload } from '../types/auth';

const router = express.Router();

router.get('/admin', authenticateJWT, checkRole(['Admin']), (req, res) => {
  const user = req.user as UserPayload;
  res.json({
    message: 'Admin Dashboard Data',
    user: {
      id: user.id,
      role: user.role
    },
    data: {
      totalUsers: 100,
      newUsers: 10,
      activeUsers: 50
    }
  });
});

router.get('/editor', authenticateJWT, checkRole(['Admin', 'Editor']), (req, res) => {
  const user = req.user as UserPayload;
  res.json({
    message: 'Editor Dashboard Data',
    user: {
      id: user.id,
      role: user.role
    },
    data: {
      totalPosts: 25,
      draftPosts: 5,
      publishedPosts: 20
    }
  });
});

router.get('/viewer', authenticateJWT, checkRole(['Admin', 'Editor', 'Viewer']), (req, res) => {
  const user = req.user as UserPayload;
  res.json({
    message: 'Viewer Dashboard Data',
    user: {
      id: user.id,
      role: user.role
    },
    data: {
      recentUpdates: [
        { id: 1, title: 'Update 1', date: new Date() },
        { id: 2, title: 'Update 2', date: new Date() }
      ]
    }
  });
});

export default router;