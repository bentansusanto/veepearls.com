"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  API_URL,
  getDataAuthorization,
  postData,
  postDataVerify,
  postDataWithAuth,
} from "../ApiConfig";

// register user
export const Register = () => {
  const regisMutation = useMutation({
    mutationFn: async (values: any) =>
      postData(`${API_URL}/auth/register`, values),
    onSuccess: (data: any) => {
      console.log(data.message);
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
  return {
    regisMutation,
    error: regisMutation.isError,
    success: regisMutation.isSuccess,
  };
};

// verify user
export const VerifyAccount = () => {
  const verifyMutation = useMutation({
    mutationFn: async (values: any) =>
      postData(`${API_URL}/auth/verify_account`, values),
    onSuccess: (data: any) => {
      console.log(data.message);
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
  return {
    verifyMutation,
    error: verifyMutation.error,
    success: verifyMutation.isSuccess,
  };
};

// login user
export const LoginUser = () => {
  return useMutation({
    mutationFn: async (values: any) =>
      postData(`${API_URL}/auth/login`, values),
    onSuccess: (data: any) => {
      console.log(data.message);
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
};

// verify otp
export const VerifyOtp = () => {
  const verifyOtpMutation = useMutation({
    mutationFn: async (values: any) =>
      postDataVerify(`${API_URL}/auth/verify_otp`, values),
    onSuccess: (data: any) => {
      const token = data.data;
      if (token) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        Cookies.set("session_veepearl", token, {
          path: "/",
          secure: true,
          sameSite: "none",
          expires,
        });
      } else {
        throw new Error("Token tidak ditemukan dalam respons.");
      }
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
  return {
    verifyOtpMutation,
    error: verifyOtpMutation.error,
    success: verifyOtpMutation.isSuccess,
  };
};

// refresh token
export const RefreshToken = () => {
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/auth/refresh_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        Cookies.remove("session_veepearl");
        window.location.href = "/login";
        return false;
      }
      const data = await res.json();
      const tokens = data.tokens;
      if (tokens) {
        // Cookies.set('accessToken', token); // Simpan token di cookies
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        Cookies.set("session_veepearl", data.accessToken, {
          secure: true,
          sameSite: "strict",
        });
      } else {
        throw new Error("tokens not found");
      }
    },
  });
  return {
    refreshTokenMutation,
  };
};

// get profil
export const GetUser = () => {
  const token = Cookies.get("session_veepearl");
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!token) {
        throw new Error("Token tidak ditemukan.");
      }
      const res = await getDataAuthorization(`${API_URL}/auth/getUser`, token);
      if (!res) {
        throw new Error("Gagal mengambil data user.");
      }
      return res.data;
    },
  });
};

export const Logout = () => {
  const token = Cookies.get("session_veepearl");
  const logoutMutation = useMutation({
    mutationFn: async () =>
      postDataWithAuth(`${API_URL}/auth/logout`, {}, token),
    onSuccess: (data: any) => {
      console.log(data.message);
      Cookies.remove("session_veepearl");
      window.location.href = "/login";
    },
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return {
    logout: handleLogout,
  };
};
