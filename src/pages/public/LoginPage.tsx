import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Mail, Lock, Eye, EyeOff, ChevronRight } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{isLogin ? "Login" : "Register"}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-card border border-border overflow-hidden">
              {/* Header tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                    isLogin ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                    !isLogin ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                  }`}
                >
                  Register
                </button>
              </div>

              <div className="p-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h1 className="font-display text-xl text-foreground">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isLogin ? "Sign in to manage your orders" : "Join Manish Kejani for easy ordering"}
                  </p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Full name"
                        className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full h-11 pl-10 pr-10 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {!isLogin && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full h-11 pl-10 pr-4 bg-secondary border border-border rounded-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full h-11 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </button>
                </form>

                {isLogin && (
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    <a href="#" className="text-primary hover:underline">Forgot password?</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
