// src/pages/public/GoogleAuthSuccess.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import api from '@/lib/api';

const GoogleAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();

  useEffect(() => {
    const accessToken  = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) {
      toast.error('Google sign-in failed. Please try again.');
      navigate('/login');
      return;
    }

    // Store tokens
    localStorage.setItem('mk_user_tokens', JSON.stringify({ accessToken, refreshToken }));

    // Fetch user profile using the new token
    api.get('/api/v1/auth/profile')
      .then(({ data }) => {
        localStorage.setItem('mk_user', JSON.stringify(data.data));
        toast.success(`Welcome, ${data.data.username}! 🎉`);
        navigate('/');
      })
      .catch(() => {
        // Even if profile fetch fails, tokens are stored — redirect home
        toast.success('Signed in with Google!');
        navigate('/');
      });
  }, []);

  return <LoadingSpinner className="min-h-screen" />;
};

export default GoogleAuthSuccess;
