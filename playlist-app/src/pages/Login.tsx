import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { isValidEmail, isValidPassword } from '../utils/validators';
import { saveSession } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const STATIC_EMAIL = 'user@sonora.com';
const STATIC_PASSWORD = 'M12345';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return setErr('E-mail inválido. Por favor, tente novamente.');
    }
    if (!isValidPassword(password)) {
      return setErr(
        'Senha deve ter ao menos 6 caracteres, pelo menos 1 número e pelo menos 1 letra maiúscula.'
      );
    }

    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      const user = { id: 'user-1', email };
      dispatch(loginSuccess(user));
      saveSession('lastSession', {
        email,
        lastLogin: new Date().toISOString(),
      });
      nav('/home');
      return;
    }
    setErr('Credenciais incorretas. Tente novamente.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#FF4081]/50 via-zinc-500 to-[#FF7F50]/50 p-4">
      <Card className="w-full max-w-md border border-pink-200 shadow-lg">
        <CardHeader>
          <CardTitle>
            <h2 className="text-center text-3xl font-bold text-[#FF4081]">
              Sonora
            </h2>
          </CardTitle>
          <CardDescription className="text-center">
            Faça login para acessar suas playlists
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {err && (
              <div className="flex items-center gap-2 rounded-md border border-red-400 bg-red-100 p-2 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                {err}
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-600">
                E-mail
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:border-[#FF4081] focus:ring-[#FF4081]"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium text-gray-600">
                Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="pr-10 focus:border-[#FF4081] focus:ring-[#FF4081]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-[#FF4081]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-md bg-[#FF4081] text-white transition-colors hover:bg-[#FF4081]/90"
            >
              Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-xs text-gray-500">
          <span>Não tem conta? Crie uma em breve</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
