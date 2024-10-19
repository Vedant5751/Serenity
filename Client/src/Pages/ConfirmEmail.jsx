import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Link } from "react-router-dom";

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export default function ConfirmEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err) => {
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
      console.log("Email confirmed successfully");
      navigate("/signin"); // Redirect to sign-in page
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Confirm Email</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-4" onSubmit={handleConfirm}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="helloworld@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Confirmation Code</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              placeholder="Enter your confirmation code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 ${loading ? "bg-gray-400" : "bg-green-600"} text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm Email"}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already confirmed?{" "}
            <Link to="/signin" className="text-green-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
