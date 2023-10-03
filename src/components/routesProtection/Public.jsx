import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

export const Public = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};