import { SxProps, Theme } from "@mui/material";

export const textFieldStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", 
      borderBottom: "0.5px solid",
      borderColor: "gray",
      borderRadius: 0, 
    },
    "&:hover fieldset": {
      border: "none",
      borderBottom: "1px solid",
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      border: "none",
      borderBottom: "2px solid", 
      borderColor: "gary.500",
    },
  },
};