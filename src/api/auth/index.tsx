import { useMutation  } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { post } from "../Api";
import TokenService from "../token/TokenService";
import { toast } from "../../utils/toaster/ToastContainer";

export const useSignupMutation = ()=>{
    return useMutation({
        mutationFn: async (data: any) => {
          return await post("/auth/api/signup", data);
        },
        onSuccess: (response) => {
          if (response.success) {
            toast.success(response?.message);
          } else {
            console.error(response?.message);
          }
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message);
        },
      });
}


export const useLoginMutation = ()=>{
    const navigate =useNavigate();
     return useMutation({
         mutationFn:async(data: { identifier: string; password: string })=>{
            return await post("/auth/api/login",data)
         },
     onSuccess:(response)=>{
         if(response.success && response.token){
            TokenService.setToken(response.token)
            window.dispatchEvent(new Event("storage"));
            toast.success(response?.message)
            const role = TokenService.getRole();
            if(role === 'admin'){
                navigate("/admin")
            }else if(role === 'user'){
                navigate("/books")
            }
            else{
                localStorage.clear()
                sessionStorage.clear()
                TokenService.removeToken()
                toast.error(response?.message);
            }
         }else{
            toast.error(response?.message);
         }
     },
     onError: (err: any) => {
        const errorMessage =
          err.response?.data?.message ;
        toast.error(errorMessage);
      },
     })
}