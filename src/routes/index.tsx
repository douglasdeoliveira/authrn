import React from 'react';

import Loader from '../components/Loader';
import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
