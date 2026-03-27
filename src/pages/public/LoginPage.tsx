// src/pages/public/LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { User, Mail, Lock, Eye, EyeOff, Phone, ChevronRight, ArrowLeft } from 'lucide-react';

type View = 'login' | 'register' | 'forgot' | 'verify-code' | 'reset-password' | 'check-email';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, login, forgotPassword, verifyResetCode, resetPassword } = useAuth();

  const [view,          setView]          = useState<View>('login');
  const [showPassword,  setShowPassword]  = useState(false);
  const [resetEmail,    setResetEmail]    = useState('');
  const [resetToken,    setResetToken]    = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', phone: '', password: '', confirm: '' });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [codeForm,  setCodeForm]  = useState({ code: '' });
  const [resetForm, setResetForm] = useState({ newPassword: '', confirm: '' });

  // ── LOGIN ──────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username.trim()) return toast.error('Username is required');
    if (!loginForm.password)        return toast.error('Password is required');

    login.mutate(loginForm, {
      onSuccess: () => {
        toast.success('Welcome back!');
        navigate('/');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Login failed');
      },
    });
  };

  // ── REGISTER ───────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.username.trim())  return toast.error('Username is required');
    if (!registerForm.email.trim())     return toast.error('Email is required');
    if (!registerForm.password)         return toast.error('Password is required');
    if (registerForm.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (registerForm.password !== registerForm.confirm) return toast.error('Passwords do not match');

    register.mutate({
      username: registerForm.username.trim(),
      email:    registerForm.email.trim(),
      phone:    registerForm.phone.trim() || undefined,
      password: registerForm.password,
    }, {
      onSuccess: () => {
        setView('check-email');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Registration failed');
      },
    });
  };

  // ── FORGOT PASSWORD ────────────────────────────────────
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotForm.email.trim()) return toast.error('Email is required');

    forgotPassword.mutate(forgotForm.email, {
      onSuccess: () => {
        setResetEmail(forgotForm.email);
        toast.success('Reset code sent to your email');
        setView('verify-code');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to send reset code');
      },
    });
  };

  // ── VERIFY RESET CODE ──────────────────────────────────
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeForm.code.trim()) return toast.error('Reset code is required');

    verifyResetCode.mutate({ email: resetEmail, code: codeForm.code.trim() }, {
      onSuccess: (data: any) => {
        setResetToken(data.data.resetSessionToken);
        toast.success('Code verified');
        setView('reset-password');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Invalid or expired code');
      },
    });
  };

  // ── RESET PASSWORD ─────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetForm.newPassword)         return toast.error('New password is required');
    if (resetForm.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    if (resetForm.newPassword !== resetForm.confirm) return toast.error('Passwords do not match');

    resetPassword.mutate({
      email:             resetEmail,
      resetSessionToken: resetToken,
      newPassword:       resetForm.newPassword,
    }, {
      onSuccess: () => {
        toast.success('Password reset successfully. Please log in.');
        setView('login');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to reset password');
      },
    });
  };

  const inputClass = 'w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30';

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground capitalize">{view === 'check-email' ? 'Check Email' : view.replace('-', ' ')}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-card border border-border overflow-hidden">

              {/* ── CHECK EMAIL VIEW ── */}
              {view === 'check-email' && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-display text-xl text-foreground mb-2">Check your email</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    We sent a verification link to <strong className="text-foreground">{registerForm.email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Click the <strong>Verify Email Address</strong> button in the email to activate your account. The link expires in 24 hours.
                  </p>
                  <button onClick={() => setView('login')}
                    className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
                    Back to Login
                  </button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Didn't receive it?{' '}
                    <button onClick={() => setView('register')} className="text-primary hover:underline">
                      Try again
                    </button>
                  </p>
                </div>
              )}

              {/* ── LOGIN / REGISTER TABS ── */}
              {(view === 'login' || view === 'register') && (
                <>
                  <div className="flex border-b border-border">
                    <button onClick={() => setView('login')}
                      className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${view === 'login' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                      Login
                    </button>
                    <button onClick={() => setView('register')}
                      className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${view === 'register' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                      Register
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <User className="w-12 h-12 text-primary mx-auto mb-3" />
                      <h1 className="font-display text-xl text-foreground">
                        {view === 'login' ? 'Welcome Back' : 'Create Account'}
                      </h1>
                      <p className="text-xs text-muted-foreground mt-1">
                        {view === 'login' ? 'Sign in to manage your orders' : 'Join Manish Kejani for easy ordering'}
                      </p>
                    </div>

                    {/* LOGIN FORM */}
                    {view === 'login' && (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" placeholder="Username" value={loginForm.username}
                            onChange={e => setLoginForm(p => ({ ...p, username: e.target.value }))}
                            className={inputClass} />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type={showPassword ? 'text' : 'password'} placeholder="Password"
                            value={loginForm.password}
                            onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                            className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <button type="submit" disabled={login.isPending}
                          className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                          {login.isPending ? 'Signing in...' : 'Sign In'}
                        </button>
                        <p className="text-center text-xs text-muted-foreground">
                          <button type="button" onClick={() => setView('forgot')} className="text-primary hover:underline">
                            Forgot password?
                          </button>
                        </p>
                      </form>
                    )}

                    {/* REGISTER FORM */}
                    {view === 'register' && (
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" placeholder="Username" value={registerForm.username}
                            onChange={e => setRegisterForm(p => ({ ...p, username: e.target.value }))}
                            className={inputClass} />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="email" placeholder="Email address" value={registerForm.email}
                            onChange={e => setRegisterForm(p => ({ ...p, email: e.target.value }))}
                            className={inputClass} />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="tel" placeholder="Phone number (optional)" value={registerForm.phone}
                            onChange={e => setRegisterForm(p => ({ ...p, phone: e.target.value }))}
                            className={inputClass} />
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type={showPassword ? 'text' : 'password'} placeholder="Password (min 6 characters)"
                            value={registerForm.password}
                            onChange={e => setRegisterForm(p => ({ ...p, password: e.target.value }))}
                            className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="password" placeholder="Confirm password" value={registerForm.confirm}
                            onChange={e => setRegisterForm(p => ({ ...p, confirm: e.target.value }))}
                            className={inputClass} />
                        </div>
                        <button type="submit" disabled={register.isPending}
                          className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                          {register.isPending ? 'Creating account...' : 'Create Account'}
                        </button>
                      </form>
                    )}
                  </div>
                </>
              )}

              {/* ── FORGOT PASSWORD ── */}
              {view === 'forgot' && (
                <div className="p-6">
                  <button onClick={() => setView('login')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                  </button>
                  <div className="text-center mb-6">
                    <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="font-display text-xl text-foreground">Forgot Password</h2>
                    <p className="text-xs text-muted-foreground mt-1">Enter your email to receive a reset code</p>
                  </div>
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="email" placeholder="Email address" value={forgotForm.email}
                        onChange={e => setForgotForm({ email: e.target.value })}
                        className={inputClass} />
                    </div>
                    <button type="submit" disabled={forgotPassword.isPending}
                      className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                      {forgotPassword.isPending ? 'Sending...' : 'Send Reset Code'}
                    </button>
                  </form>
                </div>
              )}

              {/* ── VERIFY RESET CODE ── */}
              {view === 'verify-code' && (
                <div className="p-6">
                  <button onClick={() => setView('forgot')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <div className="text-center mb-6">
                    <Mail className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="font-display text-xl text-foreground">Enter Reset Code</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      We sent a 6-digit code to <strong>{resetEmail}</strong>
                    </p>
                  </div>
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    <input type="text" placeholder="6-digit code" maxLength={6} value={codeForm.code}
                      onChange={e => setCodeForm({ code: e.target.value })}
                      className="w-full h-11 px-4 bg-secondary border border-border rounded-input text-sm text-foreground text-center tracking-widest placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    <button type="submit" disabled={verifyResetCode.isPending}
                      className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                      {verifyResetCode.isPending ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </form>
                </div>
              )}

              {/* ── RESET PASSWORD ── */}
              {view === 'reset-password' && (
                <div className="p-6">
                  <div className="text-center mb-6">
                    <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h2 className="font-display text-xl text-foreground">Set New Password</h2>
                    <p className="text-xs text-muted-foreground mt-1">Choose a strong password</p>
                  </div>
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={showPassword ? 'text' : 'password'} placeholder="New password"
                        value={resetForm.newPassword}
                        onChange={e => setResetForm(p => ({ ...p, newPassword: e.target.value }))}
                        className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="password" placeholder="Confirm new password" value={resetForm.confirm}
                        onChange={e => setResetForm(p => ({ ...p, confirm: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <button type="submit" disabled={resetPassword.isPending}
                      className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                      {resetPassword.isPending ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
