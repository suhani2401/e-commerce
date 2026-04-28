import { useState } from "react";
import { api } from "../axios";

export const useDeleteAxios = <T = any>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.delete<T>(url);

      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error";

      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return [deleteData, { isLoading, error }] as const;
};