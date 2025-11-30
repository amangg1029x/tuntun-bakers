import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

/**
 * Hook to handle Clerk token refresh requests
 * Listens for custom events from API interceptor
 */
export const useTokenRefresh = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const handleTokenRefresh = async () => {
      try {
        // Don't specify template - use default Clerk session token
        const token = await getToken();
        if (token) {
          localStorage.setItem('clerk-token', token);
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        localStorage.removeItem('clerk-token');
      }
    };

    // Listen for token refresh requests
    window.addEventListener('clerk-token-refresh', handleTokenRefresh);

    // Refresh token periodically (every 45 minutes)
    const refreshInterval = setInterval(async () => {
      if (!isSignedIn) return;
      
      try {
        const token = await getToken();
        if (token) {
          localStorage.setItem('clerk-token', token);
          console.log('Token refreshed successfully');
        }
      } catch (error) {
        console.error('Periodic token refresh failed:', error);
      }
    }, 45 * 60 * 1000); // 45 minutes

    return () => {
      window.removeEventListener('clerk-token-refresh', handleTokenRefresh);
      clearInterval(refreshInterval);
    };
  }, [getToken, isSignedIn]);
};

export default useTokenRefresh;