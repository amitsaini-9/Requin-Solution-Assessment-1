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

export const hasAccess = (requiredRole: string): boolean => {
  const payload = getTokenPayload();
  if (!payload) return false;

  switch (requiredRole) {
    case 'Admin':
      return payload.role === 'Admin';
    case 'Editor':
      return ['Admin', 'Editor'].includes(payload.role);
    case 'Viewer':
      return ['Admin', 'Editor', 'Viewer'].includes(payload.role);
    default:
      return false;
  }
};