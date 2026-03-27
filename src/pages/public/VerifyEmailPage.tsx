// src/pages/public/VerifyEmailPage.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token found. Please check your email link.');
      return;
    }

    api.get(`/api/v1/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus('success');
        setMessage('Your email has been verified successfully! You can now log in.');
      })
      .catch((err: any) => {
        setStatus('error');
        setMessage(err?.response?.data?.message ?? 'Verification failed. The link may have expired.');
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-card rounded-card border border-border p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
              <h2 className="font-display text-xl text-foreground mb-2">Verifying your email...</h2>
              <p className="text-sm text-muted-foreground">Please wait a moment.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="font-display text-xl text-foreground mb-2">Email Verified!</h2>
              <p className="text-sm text-muted-foreground mb-6">{message}</p>
              <Link to="/login"
                className="inline-block w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity leading-[44px]">
                Go to Login
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="font-display text-xl text-foreground mb-2">Verification Failed</h2>
              <p className="text-sm text-muted-foreground mb-6">{message}</p>
              <div className="space-y-3">
                <Link to="/login"
                  className="block w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity leading-[44px] text-center">
                  Back to Login
                </Link>
                <p className="text-xs text-muted-foreground">
                  Need a new link?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Request verification email
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmailPage;
