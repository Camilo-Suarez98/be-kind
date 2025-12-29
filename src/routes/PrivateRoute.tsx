import { useAuthStore } from '../store/auth.store';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((user) => user.token);
  return token ? children : <Navigate to="/" />
};
