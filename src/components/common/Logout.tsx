import React from 'react';
import { LogOut } from 'lucide-react';
import useAuth from '../../hook/UseAuth';
import { toast } from '../../utils/toaster/ToastContainer';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';


interface LogoutProps {
  variant?: 'text' | 'icon' | 'full';
  onCloseMenu?: () => void;
}

const Logout: React.FC<LogoutProps> = ({ variant = 'full', onCloseMenu }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const renderButton = () => {
    switch (variant) {
      case 'icon':
        return (
          <button
            className="flex items-center justify-center p-2 text-gray-700 hover:text-black transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        );
      case 'text':
        return (
          <button
            className="text-gray-700 hover:text-black transition-colors font-medium"
          >
            Logout
          </button>
        );
      default:
        return (
          <button
            className="flex items-center space-x-1 btn-secondary"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        );
    }
  };

  const handleLogout = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    logout();
    navigate('/');
    toast.success("Logged out successfully");
  };

  return (
    <ConfirmationDialog
      triggerButton={renderButton()}
      title="Confirm Logout"
      message="Are you sure you want to logout?"
      confirmButtonText="Logout"
      cancelButtonText="Cancel"
      onConfirm={handleLogout}
      onCloseMenu={onCloseMenu}
    />
  );
};

export default Logout;