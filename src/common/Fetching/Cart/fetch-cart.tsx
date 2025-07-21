'use client'
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  API_URL,
  deleteDataWithAuth,
  getDataAuthorization,
  postDataWithAuth,
  putDataWithAuth,
} from "../ApiConfig";

export const GetAllCart = () => {
  const token = Cookies.get("session_veepearl");
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getDataAuthorization(`${API_URL}/find_cart`, token);
      if (!res) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    },
  });
};

export const CreateCart = () => {
  const token = Cookies.get("session_veepearl");
  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      const res = await postDataWithAuth(`${API_URL}/add_cart`, data, token);
      if (!res) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    },
  });
};

export const UpdateCart = () => {
  return useMutation({
    mutationFn: async ({ cartId, quantity }: { cartId: string; quantity: number }) => {
      const token = Cookies.get("session_veepearl");
      return putDataWithAuth(`${API_URL}/update_product_cart/${cartId}`, { quantity }, token);
    },
  });
};


export const RemoveCart = () => {
  const tokens = Cookies.get("session_veepearl");
  return useMutation({
    mutationFn: async (cartId: string) =>
      deleteDataWithAuth(
        `${API_URL}/remove_product_cart/${cartId}`,
        tokens as string
      ),
  });
};
