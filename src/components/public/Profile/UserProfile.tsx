import { Box, Avatar, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useGetProfileById } from "../../../api/user";
import ProfileInformation from "./ProfileInfo";
import LoadingContainer from "../../../utils/loader/LoadingContainer";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: user, isLoading } = useGetProfileById();

  const handleTabChange = (_event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "gray.50",
        px: { xs: 2, sm: 4, lg: 8 },
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        className="text-3xl font-bold text-gray-900 mb-4 text-center"
      >
        Profile
      </Typography>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sidebar - Profile Section */}
        <div className="rounded-2xl p-6 shadow-xl w-full md:w-80 text-center">
          <Avatar
            sx={{
              width: 200,
              height: 200,
              mb: 2,
              mx: "auto",
              bgcolor: "black",
            }}
          >
            {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <Typography variant="h6" className="font-bold mb-1">
            {user?.fullname}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {user?.role}
          </Typography>
          <div className="mt-4">
            <button className="btn-secondary">Upload Photo</button>
          </div>
        </div>

        {/* Right Section - Tabs */}
        <div className="rounded-2xl p-6 shadow-xl flex-1">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              mb: 3,
              textDecoration: "none",
              "& .MuiTabs-flexContainer": {
                justifyContent: "flex-end",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "black",
                height: "2px",
              },
              "& .css-1usuzwp-MuiButtonBase-root-MuiTab-root": {
                textTransform: "none",
                fontWeight: "bold",
                fontFamily:
                  '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              },
              "& .MuiTab-textColorPrimary": {
                color: "gray",
                "&.Mui-selected": {
                  color: "black",
                },
              },
            }}
          >
            <Tab label="Info" />
            <Tab label="Books" />
            <Tab label="Settings" />
          </Tabs>
          <div className="p-4 min-h-[300px]">
            {!isLoading && activeTab === 0 && (
              <ProfileInformation user={user || null} />
            )}

            {activeTab === 1 && (
              <Typography variant="body1">Books Page Content</Typography>
            )}
            {activeTab === 2 && (
              <Typography variant="body1">Settings Page Content</Typography>
            )}
          </div>
        </div>
      </div>
      {isLoading && (
        <LoadingContainer open={true} message="Loading Profile..." />
      )}
    </Box>
  );
};

export default UserProfile;
