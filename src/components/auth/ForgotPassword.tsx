import React, { useState } from 'react';
import { ArrowLeft, Mail, Eye, EyeOff } from 'lucide-react';
import { MuiOtpInput } from "mui-one-time-password-input";
import LoadingContainer from '../../utils/loader/LoadingContainer';
import { useForgotpassword } from '../../api/auth';
import { toast } from '../../utils/toaster/ToastContainer';

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

type ActionType = 'send_otp' | 'verify_otp' | 'reset_password' | 'resend_otp';

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [otp, setOtp] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<ActionType>('send_otp');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const ForgotPasswordMutation = useForgotpassword();
  const { mutate, isPending } = ForgotPasswordMutation;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (step === 1 && formData.email) {
        setCurrentAction('send_otp');
        mutate({ email: formData.email }, {
          onSuccess: () => {
            setStep((prev) => prev + 1);
          },
          onError: (error) => {
            console.error("Error sending OTP", error);
          },
        });
      } else if (step === 2 && otp.length === 6) {
        setCurrentAction('verify_otp');
        mutate({ email: formData.email, otp }, {
          onSuccess: () => {
            setStep((prev) => prev + 1);
          },
          onError: () => {
            setOtp("");
          },
        });
      } else if (step === 3) {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        setCurrentAction('reset_password');
        mutate({ email: formData.email, password: formData.password, otp }, {
          onSuccess: () => {
            onBackToLogin();
            setFormData({ email: "", password: "", confirmPassword: "" });
            setOtp("");
            setStep(1);
          },
          onError: (error) => {
            console.error("Error resetting password", error);
          },
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleResendOtp = () => {
    setCurrentAction('resend_otp');
    mutate({ email: formData.email });
  };

  const handleOtpChange = (newValue: string) => {
    setOtp(newValue);
  };

  const getLoadingMessage = () => {
    switch (currentAction) {
      case 'send_otp':
        return "Sending OTP...";
      case 'resend_otp':
        return "Resending OTP...";
      case 'verify_otp':
        return "Verifying OTP...";
      case 'reset_password':
        return "Resetting password...";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={onBackToLogin}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to login
          </button>
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-black" />
          </div>
        </div>

        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Reset Password</h2>
      
          <form className="space-y-6" onSubmit={handleSubmit}>
            {step >= 1 && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={step > 1}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black disabled:bg-gray-100"
                  placeholder="Enter your email address"
                />
              </div>
            )}

            {step >= 2 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter verification code
                </label>
                <MuiOtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  length={6}
                  className="gap-2"
                  validateChar={(char: string) => /^\d+$/.test(char)}
                  TextFieldsProps={{
                    disabled: step > 2,
                    placeholder: '-',
                    size: 'small',
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        height: "40px",
                        "&:hover fieldset": {
                          borderColor: "#000",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#000",
                        },
                      },
                    },
                  }}
                />
                <div className="text-center text-sm text-gray-600 mt-2">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-medium text-black hover:text-gray-800 cursor-pointer"
                    disabled={isPending}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black pr-10"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black pr-10`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isPending || (step === 2 && otp.length !== 6)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
              </button>
            </div>
          </form>
        </div>

        <LoadingContainer
          open={isPending}
          message={getLoadingMessage()}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;