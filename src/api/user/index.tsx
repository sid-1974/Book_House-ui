import {  useQuery } from "@tanstack/react-query"
import { get } from "../Api";
import TokenService from "../token/TokenService";


export const useGetProfileById = () => {
  const userId = TokenService.getuserId();
  
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const response = await get(`/user/api/profile/${userId}`);
      if (response?.success) {
        return response?.user || null;
      } else {
        throw new Error(response?.data?.error?.message);
      }
    },
    enabled: !!userId,
  });
};