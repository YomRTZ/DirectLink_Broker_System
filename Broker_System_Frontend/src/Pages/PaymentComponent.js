import React, { useState } from "react";
import axios from "axios";
import { on } from "events";
import card from "../assets/img/card.png";
const PaymentComponent = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {

      //validation inputs
      if(!fname || !lname || !email || !amount){
        setError("All fields are required");
        return;
      }
      if(isNaN(amount) || amount <= 0){
        setError("Please enter a valid amount");
        return;
      }
      // Request to your backend to initiate payment
      const response = await axios.post("http://localhost:4400/api/pay", {
        amount: amount,
        email: email, 
        first_name: fname, 
        last_name: lname, 
      });

      // Redirect to Chapa's checkout page if response contains the checkout_url
      if (response.data && response.data.checkout_url) {
        // Redirect to Chapa checkout
        window.location.href = response.data.checkout_url; 
        
      } else {
        console.error("Error: No checkout URL returned.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePayment();
  };

  return (
    <div>
      <div className="min-h-screen py-6 flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-full max-w-2xl  bg-white shadow-xl rounded-3xl flex overflow-hidden">
          {/* Form Section */}
          <div className="w-2/3 p-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Make a Payment
            </h2>
            {error &&(
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* First Name */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              {/* Amount */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  {loading ? "Processing..." : "Proceed to Pay"}
                </button>
              </div>
            </form>
          </div>

          {/* Information Section */}
          <div className="w-1/3 bg-green-600 text-white p-8 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold mb-4">Your service</h3>
            <ul className="text-sm space-y-2">
              <li>🔒 Secure Payment Gateway</li>
              <li>💳 Supports Multiple Payment Methods</li>
              <li>📧 24/7 Customer Support</li>
              <li>🌐 Easy and Fast Transactions</li>
            </ul>
            <div className="mt-6">
              <img
                src={card}
                alt="Payment Illustration"
                className="rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <h2>Make a Payment</h2>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Redirecting..." : "Pay Now"}
      </button> */}
    </div>
  );
};

export default PaymentComponent;
