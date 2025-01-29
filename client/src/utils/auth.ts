export const getTokenPayload = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    return null;
  }
};

export const hasAccess = (userRole: string | null, requiredRole: string): boolean => {
  if (!userRole) return false;

  switch (requiredRole) {
    case 'Admin':
      return userRole === 'Admin';
    case 'Editor':
      return ['Admin', 'Editor'].includes(userRole);
    case 'Viewer':
      return ['Admin', 'Editor', 'Viewer'].includes(userRole);
    default:
      return false;
  }
};