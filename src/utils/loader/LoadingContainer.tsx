import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import bookVideo from '../../../dist/assets/Book-BXvk7vIC.mp4';

interface LoadingContainerProps {
  open: boolean;
  message?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({ 
  open, 
  message = "Loading..." 
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      aria-labelledby="loading-dialog"
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflow: 'hidden',
        }
      }}
    >
      <DialogContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: 4
        }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: fullScreen ? '80%' : '200px',
            maxWidth: '80px',
            height: 'auto',
            marginBottom: '16px'
          }}
        >
          <source src={bookVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Loading message */}
        <p 
          style={{ 
            color: 'white', 
            fontSize: fullScreen ? '1.1rem' : '1rem',
            fontWeight: 500,
            textAlign: 'center',
            margin: 0,
            textShadow: '0px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {message}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingContainer;