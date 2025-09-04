import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { get,  put } from "../Api";
import TokenService from "../token/TokenService";
import { toast } from "../../utils/toaster/ToastContainer";


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

export const updateProfileById =  () => {
   const queryClient = useQueryClient();
     const userId = TokenService.getuserId();
      return useMutation({
        mutationFn: async (data: any) => {
          return await put(`/user/api/update-profile/${userId}`, data);
        },
        onSuccess: (response) => {
          if (response.success) {
            toast.success(response?.message);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
          } else {
            console.error(response?.message);
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      });
}