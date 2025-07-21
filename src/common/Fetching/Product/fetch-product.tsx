"use client";
import { useQuery } from "@tanstack/react-query";
import { API_URL, getData } from "../ApiConfig";

export const GetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await getData(`${API_URL}/products`);
      if (!res) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    },
  });
};

export const GetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["productId", productId],
    queryFn: async () => {
      const res = await getData(`${API_URL}/products/${productId}`);
      if (!res) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    },
  });
};
