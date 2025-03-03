import React, { useState, useEffect } from "react";
import { registerUser, getRoles } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SignUp() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
    github: false,
    linkedin: false
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
        console.log("roledata:", rolesData[0]);
      } catch (error) {
        console.error(error.message);
        setError("Failed to load roles. Please try again later.");
      }
    };
    fetchRoles();
  }, []);

  console.log(roles);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const { email, password, confirmPassword } = formValues;
    if (!selectedRole) {
      setError("Please select a role.");
      return;
    }
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(email, password, selectedRole);
      setMessage(response.message || "Account created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred during signup.");
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

  return (
    <div className="min-h-screen flex p-4">
      {/* Left Section - Dark Gray Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-800 p-12 items-center justify-center 
      rounded-tr-[150px] rounded-br-[150px] m-4">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to DirectLink!</h1>
          <p className="text-lg mb-8">Already have an account? Sign in to continue your journey</p>
          <button 
            onClick={() => navigate('/')}
            className="border-2 border-white text-white px-10 py-2 rounded-full 
            hover:bg-white hover:text-gray-800 transition-all duration-300 relative"
            disabled={isLoading}
          >
            SIGN IN
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

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {message && <p className="text-green-500 text-center mb-4">{message}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
              focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
              focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
              required
            />

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
              focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
              required
            />

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
              focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
            >
              <option value="" disabled>Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>

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
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate('/')} 
              className="text-emerald-600 hover:text-emerald-800 font-semibold"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
