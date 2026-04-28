import { useState } from "react";
import { api } from "../axios";

export const usePostAxios = <T = any>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async (url: string, body: any): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.post<T>(url, body);

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

  return [postData, { isLoading, error }] as const;
};