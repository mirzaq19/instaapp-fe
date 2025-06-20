import { createSlice } from "@reduxjs/toolkit";
import auth from "@/services/localstorage/auth";
import type { User } from "@/entities/user.types";

type LoggedUser = User;

type AuthState = {
  loading: boolean;
  user: null | LoggedUser;
  authenticated: boolean;
};

const initialState: AuthState = {
  loading: true,
  user: null,
  authenticated: !!auth.getToken(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
      state.authenticated = true;
    },
    populate: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, populate, logout, stopLoading } = authSlice.actions;

export default authSlice.reducer;
