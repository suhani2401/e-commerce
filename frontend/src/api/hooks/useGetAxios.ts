import { useState } from "react";
import { api } from "../axios";

export const useGetAxios = <T = any>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getData = async (url: string): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.get<T>(url);

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

  return [getData, { isLoading, error }] as const;
};