import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SingUpForm';


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <SignUpForm onToggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;