import { useAppDispatch } from '@/app/hooks';
import { login, logout, populate, stopLoading } from '@/app/slices/authSlice';
import ApplicationError from '@/exceptions/ApplicationError';
import authApi from '@/services/api/auth/authApi';
import auth from '@/services/localstorage/auth';

type LoginDispatchProps = {
  initialAction?: () => void;
  successAction?: () => void;
  errorAction?: (error?: Error) => void;
  finalAction?: () => void;
};

const useLogin = () => {
  const dispatch = useAppDispatch();
  const loginDispatch = async ({
    initialAction = () => {},
    successAction = () => {},
    errorAction = () => {},
    finalAction = () => {},
  }: LoginDispatchProps) => {
    try {
      if (initialAction) initialAction();

      const token = auth.getToken();
      if (token === null || token === undefined) {
        throw new ApplicationError('no_token');
      }

      dispatch(login());
      const user = (await authApi.getMe()).user;
      dispatch(populate(user));
      if (successAction) successAction();
    } catch (error) {
      if (errorAction) errorAction(error as ApplicationError);
      auth.removeToken();
      dispatch(logout());
    } finally {
      dispatch(stopLoading());
      if (finalAction) finalAction();
    }
  };

  return { loginDispatch };
};

export default useLogin;
