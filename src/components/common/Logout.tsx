import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@mui/material';
import { LogOut, X } from 'lucide-react';
import useAuth from '../../hook/UseAuth';
import { toast } from '../../utils/toaster/ToastContainer';
import LoadingContainer from '../../utils/loader/LoadingContainer';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  variant?: 'text' | 'icon' | 'full';
  onCloseMenu?: () => void; 
}

const Logout: React.FC<LogoutProps> = ({ variant = 'full', onCloseMenu }) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!loading) { 
      setOpen(false);
    }
  };

  const handleConfirmLogout = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      logout();
      navigate('/');
      toast.success("Logged out successfully");
      setOpen(false);
      if (onCloseMenu) {
        onCloseMenu();
      }
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (variant) {
      case 'icon':
        return (
          <button
            onClick={handleOpen}
            className="flex items-center justify-center p-2 text-gray-700 hover:text-black transition-colors"
            title="Logout"
            disabled={loading}
          >
            <LogOut className="h-5 w-5" />
          </button>
        );
      case 'text':
        return (
          <button
            onClick={handleOpen}
            className="text-gray-700 hover:text-black transition-colors font-medium"
            disabled={loading}
          >
            Logout
          </button>
        );
      default:
        return (
          <button
            onClick={handleOpen}
            className="flex items-center space-x-1 btn-secondary"
            disabled={loading}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        );
    }
  };

  return (
    <>
      {renderButton()}
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '16px',
            minWidth: '400px',
            maxWidth: '500px',
            position: 'relative'
          }
        }}
      >
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-2xl">
            <LoadingContainer open={true} message="Logging out..." />
          </div>
        )}

        <IconButton
          aria-label="close"
          onClick={handleClose}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
            zIndex: 11 
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>

        <DialogTitle 
          id="logout-dialog-title" 
          className="text-center text-2xl font-bold pt-8 px-8"
        >
          Confirm Logout
        </DialogTitle>
        
        <DialogContent className="px-8">
          <DialogContentText 
            id="logout-dialog-description" 
            className="text-center text-gray-600 text-lg"
          >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        
        <DialogActions className="flex items-center justify-center pb-8 space-x-4 px-8"> 
          <button
            onClick={handleClose}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-base"
            disabled={loading}
          >
            Cancel
          </button> 
          <button
            onClick={handleConfirmLogout}
            className="px-8 py-3 btn-primary font-medium rounded-lg text-base relative"
            disabled={loading}
            autoFocus
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Logout;