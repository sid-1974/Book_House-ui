import { Box, TextField } from "@mui/material"
import LoadingContainer from "../../../utils/loader/LoadingContainer"
import { textFieldStyles } from "../../../utils/TextFieldStyles"
import { useState } from "react";
import { updateProfileById } from "../../../api/user";
import { toast } from "../../../utils/toaster/ToastContainer";
import ConfirmationDialog from "../../common/ConfirmationDialog";

const ProfileSettings = () => {
 const [formData, setFormData] = useState<Record<string, string>>({
   });

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const UpdateUser = updateProfileById();
    const { mutate,isPending } = UpdateUser;
    const handleSubmit = () => {
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
 
  
  mutate(formData, {
    onSuccess: () => {
      setFormData({
        password: '',
        confirmPassword: '',
      });
    },
    onError: (error) => {
      console.error("Submission error:", error);
    }
  });
};

     const renderButton = () => (
  !formData.password || !formData.confirmPassword ? null : (
    <button
      type="submit"
      className="btn-secondary"
      disabled={isPending}
      style={{ textTransform: "none", width: "fit-content", alignSelf: "flex-start" }}
    >
      Reset
    </button>
  )
);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        
        mx: "auto",
      }}
    >
    
      <TextField
        label="New Password"
        name="password"
        type="password"
        required
        placeholder="Password must be at least 6 characters long"
        value={formData.password}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
        sx={textFieldStyles}
        
      />
      
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        required
        value={formData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
        sx={textFieldStyles}
        
      />
            
      <ConfirmationDialog
        triggerButton={renderButton()}
        title="Confirm Password Change"
        message="Are you sure you want to change your password?"
        confirmButtonText="Reset"
        cancelButtonText="Cancel"
        onConfirm={handleSubmit}
      />
      {isPending && <LoadingContainer open={true} message="Updating..."/>}
    </Box>
  )
}

export default ProfileSettings
