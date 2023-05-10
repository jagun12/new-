import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useHistory();

  const redirectToSignIn = () => {
    navigate.push('/auth/sign-in/default');
  };

  if (!user) {
    redirectToSignIn();
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
