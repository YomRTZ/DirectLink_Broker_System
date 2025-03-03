import React, { useEffect, useState } from "react";
import { loginService } from "../../services/AuthService";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
    github: false,
    linkedin: false
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    setIsLoading(true);
    try {
      await loginService(email, password);
      navigate('/home');
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (platform) => {
    setSocialLoading(prev => ({ ...prev, [platform]: true }));
    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add actual social login logic here
    } catch (error) {
      console.error(error);
    } finally {
      setSocialLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowAlert(true);
    }, 1000);
    const hideTimer = setTimeout(() => {
      setShowAlert(false);
    }, 7000); 
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {showAlert && (
        <div className="fixed top-3 right-5 p-2 mb-6 bg-gray-300 text-gray-600 rounded-lg shadow-lg transition-transform transform translate-x-0"
          style={{
            transition: 'transform 0.5s ease-out',
            zIndex: 50
          }}
        >
          <Alert color="warning" withBorderAccent>
            <span className="flex flex-col">
              <span className="font-bold">Please verify your email before logging in.</span>
              <span>Check your email inbox!</span>
            </span>
          </Alert>
        </div>
      )}

      <div className="min-h-screen flex p-4">
        {/* Left Section - Dark Gray Background */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-800 p-12 items-center justify-center 
        rounded-tl-[50px] rounded-bl-[50px] rounded-tr-[150px] rounded-br-[150px] m-2">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg mb-8">Enter your personal details to use all of site features</p>
            <button 
              onClick={() => navigate('/signup')}
              className="border-2 border-white text-white px-10 py-2 rounded-full 
              hover:bg-white hover:text-gray-800 transition-all duration-300 relative"
              disabled={isLoading}
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Right Section - White Background */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h2>
            
            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              <button 
                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading.google}
              >
                {socialLoading.google ? (
                  <AiOutlineLoading3Quarters className="text-xl text-gray-600 animate-spin" />
                ) : (
                  <FaGoogle className="text-xl text-gray-600" />
                )}
              </button>
              <button 
                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                onClick={() => handleSocialLogin('facebook')}
                disabled={socialLoading.facebook}
              >
                {socialLoading.facebook ? (
                  <AiOutlineLoading3Quarters className="text-xl text-gray-600 animate-spin" />
                ) : (
                  <FaFacebook className="text-xl text-gray-600" />
                )}
              </button>
              <button 
                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                onClick={() => handleSocialLogin('github')}
                disabled={socialLoading.github}
              >
                {socialLoading.github ? (
                  <AiOutlineLoading3Quarters className="text-xl text-gray-600 animate-spin" />
                ) : (
                  <FaGithub className="text-xl text-gray-600" />
                )}
              </button>
              <button 
                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                onClick={() => handleSocialLogin('linkedin')}
                disabled={socialLoading.linkedin}
              >
                {socialLoading.linkedin ? (
                  <AiOutlineLoading3Quarters className="text-xl text-gray-600 animate-spin" />
                ) : (
                  <FaLinkedin className="text-xl text-gray-600" />
                )}
              </button>
            </div>

            <p className="text-center text-gray-600 mb-8">or use your email for registration</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-2 focus:bg-white outline-none transition-colors duration-200
                  ${error && !email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 
                    email ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 
                    'border-transparent focus:border-gray-800 focus:ring-gray-800/20'}`}
                />
                {error && !email && (
                  <p className="mt-1 text-sm text-red-500">Email is required</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-2 focus:bg-white outline-none transition-colors duration-200
                  ${error && !password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 
                    password ? 'border-green-500 focus:border-green-500 focus:ring-green-200' : 
                    'border-transparent focus:border-gray-800 focus:ring-gray-800/20'}`}
                />
                {error && !password && (
                  <p className="mt-1 text-sm text-red-500">Password is required</p>
                )}
              </div>

              {error && error !== "All fields are required." && (
                <p className="text-red-500 text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-center">{success}</p>
              )}
            <div>
            <Link to="/forgotpassword" className="text-black hover:text-emerald-600">
              forgot password
              </Link>
            </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white py-3 rounded-lg 
                hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 text-sm font-semibold uppercase
                shadow-lg shadow-emerald-200 relative disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Signing in...
                  </span>
                ) : (
                  'SIGN IN'
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-800 font-semibold">
                Sign UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
