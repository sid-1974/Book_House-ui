import { Box, Typography, TextField, } from "@mui/material";
import { useState } from "react";
import { User } from "../../../types";
import { textFieldStyles } from "../../../utils/TextFieldStyles";

interface ProfileInformationProps {
  user: User | null; 
}
const ProfileInformation = ({user} :ProfileInformationProps) => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save changes (e.g., API call)
    console.log("Saving profile changes:", formData);
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
      <Typography variant="h5" className="font-bold text-gray-900 mb-2">
        Personal Information
      </Typography>
      
      <TextField
        label="Full Name"
        name="fullName"
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
        style={{ textTransform: "none", width: "fit-content", alignSelf: "flex-start" }}
      >
        Save Changes
      </button>
    </Box>
  );
};

export default ProfileInformation;