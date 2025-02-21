import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  id: string;
  name?: string;
  email: string;
  token: string;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Login failed");

    const { user } = await response.json();
    document.cookie = `token=${user.token}; Path=/; Secure; SameSite=Strict`;
    return user;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    documentType: string;
    userDocument: string;
    email: string;
    password: string;
    optionalEmailSubscription: boolean;
  }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Registration failed");

    const { user } = await response.json();
    document.cookie = `token=${user.token}; Path=/; Secure; SameSite=Strict`;
    return user;
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async ({ onSignOut }: { onSignOut: () => void }) => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.cookie = "token=; Max-Age=0; Path=/;";
      onSignOut();
    } else {
      throw new Error("Logout failed");
    }
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  const response = await fetch("/api/auth/validate-token", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    document.cookie = "token=; Max-Age=0; Path=/;";
    return null;
  }

  return await response.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      })
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
