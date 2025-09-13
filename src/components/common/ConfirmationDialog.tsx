import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@mui/material';
import { X } from 'lucide-react';
import LoadingContainer from '../../utils/loader/LoadingContainer';

interface ConfirmationDialogProps {
  triggerButton: React.ReactNode; 
  title: string; 
  message: string; 
  confirmButtonText?: string; 
  cancelButtonText?: string; 
  onConfirm: (e?: React.FormEvent) => Promise<void> | void
  onCloseMenu?: () => void; 
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  triggerButton,
  title,
  message,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  onConfirm,
  onCloseMenu
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!loading) {
      setOpen(false);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
      if (onCloseMenu) {
        onCloseMenu();
      }
    } catch (error) {
      console.error(`${title} error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={handleOpen}>{triggerButton}</div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
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
            <LoadingContainer open={true} message={`${title}...`} />
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
          id="confirmation-dialog-title" 
          className="text-center text-2xl font-bold pt-8 px-8"
        >
          {title}
        </DialogTitle>
        
        <DialogContent className="px-8">
          <DialogContentText 
            id="confirmation-dialog-description" 
            className="text-center text-gray-600 text-lg"
          >
            {message}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions className="flex items-center justify-center pb-8 space-x-4 px-8"> 
          <button
            onClick={handleClose}
            className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-base"
            disabled={loading}
          >
            {cancelButtonText}
          </button> 
          <button
            onClick={handleConfirm}
            className="px-8 py-3 btn-primary font-medium rounded-lg text-base relative"
            disabled={loading}
            autoFocus
          >
            {loading ? `${confirmButtonText}...` : confirmButtonText}
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;