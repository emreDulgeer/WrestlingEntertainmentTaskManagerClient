import React from 'react';
import { login } from '../../services/Auth/api';
import LoginForm from '../../components/Auth/LoginForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import decodeMyToken from '../../src/utils/decodeMyToken';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const token = await login(values);
      const decodedUser = decodeMyToken(token);

      if (!decodedUser) {
        throw new Error('Failed to decode token!');
      }

      // Kullanıcıyı context'e kaydet
      loginUser(token, decodedUser);

      // Başarılı giriş sonrası /home'a yönlendir
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message || error.response?.data);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-red-900 text-white">
      <div className="bg-black p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Welcome to Wrestling Entertainment Task Manager</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
