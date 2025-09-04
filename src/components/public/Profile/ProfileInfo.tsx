import { Box, TextField, } from "@mui/material";
import { useState } from "react";
import { User } from "../../../types";
import { textFieldStyles } from "../../../utils/TextFieldStyles";
import { updateProfileById } from "../../../api/user";
import LoadingContainer from "../../../utils/loader/LoadingContainer";

interface ProfileInformationProps {
  user: User | null; 
}
const ProfileInformation = ({user} :ProfileInformationProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    fullname:user?.fullname || '',
    email:user?.email || '',
    mobileno:user?.mobileno || '',
    bio:user?.bio || '',
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

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
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
        sx={textFieldStyles}
      />
      
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
        sx={textFieldStyles}
      />
      
      <TextField
        label="Phone Number"
        name="mobileno"
        type="tel"
        value={formData.mobileno}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
       sx={textFieldStyles}
      />
      <TextField
        label="Bio"
        name="bio"
        type="tel"
        value={formData.bio}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
        className="rounded-lg"
        sx={textFieldStyles}
      />
      
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn-secondary"
          disabled={isPending}
        style={{ textTransform: "none", width: "fit-content", alignSelf: "flex-start" }}
      >
        Save Changes
      </button>
      {isPending && <LoadingContainer open={true} message="Updating..."/>}
    </Box>
  );
};

export default ProfileInformation;