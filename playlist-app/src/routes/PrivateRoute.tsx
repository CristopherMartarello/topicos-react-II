import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const PrivateRoute = () => {
  const loggedIn = useSelector((s: RootState) => s.auth.loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
