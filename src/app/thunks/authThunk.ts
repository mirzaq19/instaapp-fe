import { login, logout, populate, stopLoading } from "@/app/slices/authSlice";
import type { AppDispatch } from "@/app/store";
import authApi from "@/services/api/auth/authApi";
import auth from "@/services/localstorage/auth";
import toast from "react-hot-toast";

export const asyncLoginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    let status = true;
    const toastId = toast.loading("Loggin in...");
    try {
      const response = await authApi.login({ email, password });
      auth.setToken({ access_token: response.token });
      dispatch(login());
      const responseUser = await authApi.getMe();
      dispatch(populate(responseUser.user));
      dispatch(stopLoading());
      toast.success("Login successful", { id: toastId });
    } catch (error) {
      console.log((error as Error).message);
      toast.error(`Login failed: ${(error as Error).message}`, { id: toastId });
      status = false;
    }
    return status;
  };

export const asyncLogoutUser = () => async (dispatch: AppDispatch) => {
  const toastId = toast.loading("Logging out...");
  try {
    auth.removeToken();
    dispatch(logout());
    toast.success("Logout successful", { id: toastId });
  } catch (error) {
    console.error("Logout failed:", (error as Error).message);
    toast.error(`Logout failed: ${(error as Error).message}`, { id: toastId });
  }
};
