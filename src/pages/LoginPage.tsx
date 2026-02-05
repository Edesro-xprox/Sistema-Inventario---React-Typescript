import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findGetByUserName } from '../services/auth.service';
import AppToast from '../components/DevExtremme/Toast';
import type { ToastProps } from '../interfaces';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<ToastProps>({
    visible: false,
    message: ''
  })
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const resL = await findGetByUserName({ user: username, password: password });
      if(resL){
        localStorage.setItem('token', resL.token);
        navigate('/content/products');
      }
    }catch(e: any){
      console.error(e);
      setToast({ visible: true, message: e.response.data.message, type: 'warning' });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sistema Control Inventario</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            placeholder="Ingresa tu usuario"    
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Ingresar
        </button>
      </form>

      <AppToast
        visible={toast.visible}
        message={toast.message}
        type={toast?.type}
        displayTime={toast?.displayTime}
        onHiding={() => setToast({...toast, visible: false })}
      />
    </div>
  );
};

export default Login;