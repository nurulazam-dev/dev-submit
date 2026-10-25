"use client";

import { getUserInfo } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["USER_SESSION"],
    queryFn: async () => {
      const user = await getUserInfo();
      return user;
    },
    enabled: typeof window !== "undefined",

    staleTime: 1000 * 60,
    retry: false,
  });
};
