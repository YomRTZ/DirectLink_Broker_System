import React, { useState } from "react";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/AuthService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setMessage(""); 

    try {
      await forgotPassword(email) ;
      setMessage("Password reset link has been sent to your email.");
      navigate('/');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {message && (
          <div className={`mb-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
