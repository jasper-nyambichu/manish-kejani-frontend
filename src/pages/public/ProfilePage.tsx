// src/pages/public/ProfilePage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { User, Lock, LogOut, Heart, ChevronRight, Eye, EyeOff, Mail, Phone, Shield } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isGoogleUser, logout, changePassword } = useAuth();
  const wishlistCount = useWishlistStore(s => s.items.length);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrent,      setShowCurrent]      = useState(false);
  const [showNew,          setShowNew]          = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });

  // Redirect if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground mb-2">Sign in to view your profile</h1>
          <p className="text-sm text-muted-foreground mb-6">You need an account to access this page.</p>
          <Link to="/login"
            className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
            Sign In
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwForm.currentPassword)       return toast.error('Current password is required');
    if (!pwForm.newPassword)           return toast.error('New password is required');
    if (pwForm.newPassword.length < 6) return toast.error('New password must be at least 6 characters');
    if (pwForm.newPassword !== pwForm.confirm) return toast.error('Passwords do not match');

    changePassword.mutate({
      currentPassword: pwForm.currentPassword,
      newPassword:     pwForm.newPassword,
    }, {
      onSuccess: () => {
        toast.success('Password changed. Please log in again.');
        setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
        setShowPasswordForm(false);
        logout();
        navigate('/login');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to change password');
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
            <span className="text-foreground">My Profile</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-lg mx-auto space-y-4">

            {/* Profile card */}
            <div className="bg-card rounded-card border border-border overflow-hidden">
              <div className="bg-primary/10 px-6 py-8 text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h1 className="font-display text-xl text-foreground">{user?.username}</h1>
                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                {isGoogleUser && (
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-body bg-card px-2 py-1 rounded-badge border border-border text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
                      <path d="M47.532 24.552c0-1.636-.147-3.2-.418-4.698H24.48v9.01h12.987c-.57 2.992-2.26 5.532-4.79 7.232v5.998h7.74c4.532-4.174 7.115-10.32 7.115-17.542z" fill="#4285F4"/>
                      <path d="M24.48 48c6.48 0 11.916-2.148 15.888-5.808l-7.74-5.998c-2.148 1.44-4.896 2.292-8.148 2.292-6.264 0-11.568-4.23-13.464-9.918H3.012v6.192C6.972 42.948 15.204 48 24.48 48z" fill="#34A853"/>
                      <path d="M11.016 28.568A14.43 14.43 0 0 1 10.2 24c0-1.584.276-3.12.816-4.568v-6.192H3.012A23.94 23.94 0 0 0 .48 24c0 3.876.924 7.548 2.532 10.76l8.004-6.192z" fill="#FBBC05"/>
                      <path d="M24.48 9.514c3.528 0 6.696 1.212 9.192 3.594l6.876-6.876C36.396 2.39 30.96 0 24.48 0 15.204 0 6.972 5.052 3.012 13.24l8.004 6.192c1.896-5.688 7.2-9.918 13.464-9.918z" fill="#EA4335"/>
                    </svg>
                    Signed in with Google
                  </span>
                )}
              </div>

              {/* Info rows */}
              <div className="divide-y divide-border">
                <div className="flex items-center gap-3 px-6 py-3.5">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-body text-foreground">{user?.email}</p>
                  </div>
                </div>
                {user?.phone && (
                  <div className="flex items-center gap-3 px-6 py-3.5">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-body text-foreground">{user.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 px-6 py-3.5">
                  <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Account type</p>
                    <p className="text-sm font-body text-foreground capitalize">
                      {isGoogleUser ? 'Google Account' : 'Email & Password'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-card rounded-card border border-border overflow-hidden divide-y divide-border">
              <Link to="/wishlist"
                className="flex items-center justify-between px-6 py-4 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm font-body font-medium text-foreground">My Wishlist</span>
                </div>
                <div className="flex items-center gap-2">
                  {wishlistCount > 0 && (
                    <span className="text-xs bg-primary/10 text-primary font-body font-semibold px-2 py-0.5 rounded-badge">
                      {wishlistCount} items
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </Link>
            </div>

            {/* Change password — only for email users */}
            {!isGoogleUser && (
              <div className="bg-card rounded-card border border-border overflow-hidden">
                <button onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-primary" />
                    <span className="text-sm font-body font-medium text-foreground">Change Password</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} />
                </button>

                {showPasswordForm && (
                  <form onSubmit={handleChangePassword} className="px-6 pb-6 space-y-4 border-t border-border pt-4">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={showCurrent ? 'text' : 'password'} placeholder="Current password"
                        value={pwForm.currentPassword}
                        onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
                        className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type={showNew ? 'text' : 'password'} placeholder="New password (min 6 characters)"
                        value={pwForm.newPassword}
                        onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                        className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      <button type="button" onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="password" placeholder="Confirm new password"
                        value={pwForm.confirm}
                        onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setShowPasswordForm(false)}
                        className="flex-1 h-10 border border-border rounded-button font-body text-sm text-muted-foreground hover:bg-secondary transition-colors">
                        Cancel
                      </button>
                      <button type="submit" disabled={changePassword.isPending}
                        className="flex-1 h-10 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                        {changePassword.isPending ? 'Saving...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Logout */}
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 h-11 border border-destructive/30 text-destructive rounded-button font-body text-sm font-medium hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
