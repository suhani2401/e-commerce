import { useState } from "react";
import { api } from "../axios";

export const usePatchAxios = <T = any>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patchData = async (url: string, body: any): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await api.patch<T>(url, body);

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

  return [patchData, { isLoading, error }] as const;
};