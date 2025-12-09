import { useContext } from 'react';
import { AuthContext } from './auth-provider';

/**
 * Hook to access authentication context.
 *
 * @throws {Error} If used outside of AuthProvider.
 * @returns {AuthContextType} The authentication context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
