import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SingUpForm";
import ForgotPassword from "../components/auth/ForgotPassword";
 // 👈 create this

type AuthMode = "login" | "signup" | "forgot";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  const switchToLogin = () => setMode("login");
  const switchToSignup = () => setMode("signup");
  const switchToForgot = () => setMode("forgot");

  return (
    <div>
      {mode === "login" && <LoginForm onToggleForm={switchToSignup} onForgotPassword={switchToForgot} />}
      {mode === "signup" && <SignUpForm onToggleForm={switchToLogin} />}
      {mode === "forgot" && <ForgotPassword onBackToLogin={switchToLogin} />}
    </div>
  );
};

export default AuthPage;
