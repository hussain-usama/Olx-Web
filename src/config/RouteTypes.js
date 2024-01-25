import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect, useState } from 'react';

export const PrivateRoutes = ({ children, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const firebaseAuthentication = onAuthStateChanged(auth, (user) => {
      setIsAuthorized(!!user);
    });
    return () => {
      firebaseAuthentication(); 
    };
  }, []);

  if (isAuthorized === null) {
    return null;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
};

export const PublicRoutes = ({ children, ...rest }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    const firebaseAuthentication = onAuthStateChanged(auth, (user) => {
      setIsAuthorized(!!user);
    });
    return () => {
      firebaseAuthentication(); 
    };
  }, []);

  if (isAuthorized === null) {
    return null;
  }

  return !isAuthorized ? children : <Navigate to="/" />;
};
