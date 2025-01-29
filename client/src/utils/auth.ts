export const hasAccess = (userRole: string | null, requiredRole: string): boolean => {
  if (!userRole) return false;

  switch (requiredRole) {
    case 'Admin':
      return userRole === 'Admin';
    case 'Editor':
      return userRole === 'Admin' || userRole === 'Editor';
    case 'Viewer':
      return userRole === 'Admin' || userRole === 'Editor' || userRole === 'Viewer';
    default:
      return false;
  }
};