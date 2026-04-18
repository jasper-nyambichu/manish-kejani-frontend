// src/pages/public/GoogleAuthSuccess.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { TOKENS_KEY } from '@/auth/authStorage';
import type { SessionUser } from '@/auth/types';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login');
      return;
    }

    localStorage.setItem(TOKENS_KEY, JSON.stringify({ accessToken, refreshToken }));

    api
      .get('/api/v1/auth/profile')
      .then(({ data }) => {
        const profile = data.data as SessionUser;
        saveSession(profile, accessToken, refreshToken);
        const name = typeof profile.username === 'string' ? profile.username : 'there';
        toast.success(`Welcome, ${name}! 🎉`);
        navigate('/');
      })
      .catch(() => {
        toast.success('Signed in with Google!');
        navigate('/');
      });
  }, [accessToken, refreshToken, navigate, saveSession]);

  return <LoadingSpinner className="min-h-screen" />;
};

export default GoogleAuthSuccess;
