"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { API_URL, getDataAuthorization } from "../ApiConfig";
import { useState } from "react";

export const CreatePaymentPaypal = () => {
  const token = Cookies.get("session_veepearl");
  return useMutation({
    mutationFn: async ({ pemesanId }: { pemesanId: string }) => {
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const res = await fetch(`${API_URL}/create_order_product_paypal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Termasuk cookie untuk permintaan
        body: JSON.stringify({ pemesanId }), // Hanya kirim objek `paymentData`
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Gagal membuat pembayaran. Silakan coba lagi.",
        );
      }

      return data.data;
    },
  });
};

export const CapturePaymentPaypal = () => {
  const token = Cookies.get("session_veepearl");
  const [isSuccessPay, setIsSuccessPay] = useState<boolean>(false); // Tambahkan state untuk status sukses

  const capturePaypal = useMutation({
    mutationFn: async (tokenPaypal: string) => {
      const res = await fetch(
        `${API_URL}/capture_payment_paypal?token=${tokenPaypal}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to capture payment");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      setIsSuccessPay(true);
    },
    onError: (error: any) => {
      // alert("Pembayaran gagal!");
      throw new Error(error.message);
    },
  });

  return {
    capturePayment: capturePaypal.mutate,
    isSuccess: capturePaypal.isSuccess,
    isError: capturePaypal.isError,
    isLoading: capturePaypal.isPending,
    setIsSuccessPay,
    isSuccessPay,
  };
};

export const VerifyPaymentPaypal = (tokenPaypal: string) => {
  const tokens = Cookies.get("session_veepearl");
  return useQuery({
    queryKey: ["verifyPaypal"],
    queryFn: async () => {
      if (!tokens) {
        return { error: "Unauthorized" };
      }
      const res = await getDataAuthorization(
        `${API_URL}/verify_payment_paypal?token=${tokenPaypal}`,
        tokens,
      );
      if (!res) {
        return { error: "Unauthorized" };
      }
      return res?.data;
    },
    refetchInterval: 100,
    refetchIntervalInBackground: false,
  });
};

export const CreatePaymentCod = () => {
  const token = Cookies.get("session_veepearl");
  return useMutation({
    mutationFn: async ({ pemesanId }: { pemesanId: string }) => {
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const res = await fetch(`${API_URL}/create_order_product_cod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Termasuk cookie untuk permintaan
        body: JSON.stringify({ pemesanId }), // Hanya kirim objek `paymentData`
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Gagal membuat pembayaran. Silakan coba lagi.",
        );
      }

      return data.data;
    },
  });
};

// create payment card
export const CreatePaymentCard = () => {
  const token = Cookies.get("session_veepearl");
  return useMutation({
    mutationFn: async ({ pemesanId }: { pemesanId: string }) => {
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      const res = await fetch(`${API_URL}/create_order_product_card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Termasuk cookie untuk permintaan
        body: JSON.stringify({ pemesanId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Gagal membuat pembayaran. Silakan coba lagi.",
        );
      }
      return {
        clientSecret: data.data.clientSecret,
        orderId: data.data.id,
        orderCode: data.data.order_code,
        amount: data.data.amount,
      };
    },
  });
};

// capture payment card
export const CapturePaymentCard = () => {
  const token = Cookies.get("session_veepearl");
  const [isSuccessPayCard, setIsSuccessPayCard] = useState<boolean>(false);
  const captureCard = useMutation({
    mutationFn: async ({ paymentIntentId }: { paymentIntentId: string }) => {
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      const res = await fetch(`${API_URL}/capture_payment_card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Termasuk cookie untuk permintaan
        body: JSON.stringify({ paymentIntentId }), // Hanya kirim objek `paymentData`
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.message || "Gagal membuat pembayaran. Silakan coba lagi.",
        );
      }
      setIsSuccessPayCard(true);
      return data.data;
    },
  });
  return {
    captureCards: captureCard.mutateAsync,
    isLoadingCard: captureCard.isPending,
    isSuccessPayCard,
  };
};

export const FindHistoryOrder = () => {
  const token = Cookies.get("session_veepearl");
  return useQuery({
    queryKey: ["historyOrder"],
    queryFn: async () => {
      if (!token) {
        return { error: "Unauthorized" };
      }
      const res = await getDataAuthorization(
        `${API_URL}/find_history_order`,
        token,
      );
      if (!res) {
        return { error: "Unauthorized" };
      }
      return res?.data;
    },
  });
};
