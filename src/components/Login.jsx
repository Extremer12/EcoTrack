import React, { useState } from 'react';
import { useEcoTrack } from '../contexts/EcoTrackContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Icons } from './Icons';

const Login = () => {
  const { login } = useEcoTrack();
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-500 rounded-full">
              <Icons.Recycle />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('loginTitle')}</h1>
          <p className="text-gray-600">{t('loginSubtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">{t('loginButton')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Ej: admin, teacher3a, student1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              {t('loginButton')}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Usuarios de prueba:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><strong>Admin:</strong> admin / admin123</div>
              <div><strong>Profesor 3A:</strong> teacher3a / pass123</div>
              <div><strong>Estudiante:</strong> student1 / student123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;