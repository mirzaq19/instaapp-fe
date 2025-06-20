import useLogin from '@/hooks/use-login';
import React from 'react';
import toast from 'react-hot-toast';

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { loginDispatch } = useLogin();

  React.useEffect(() => {
    loginDispatch({
      errorAction: (error) => {
        console.log('Failed to Login:', error?.message);
        const message = error?.message || 'Failed to login';
        if (error?.message !== 'no_token') toast.error(message);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
