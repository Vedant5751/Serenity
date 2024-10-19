import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID, // Use Vite environment variable
  ClientId: import.meta.env.VITE_CLIENT_ID, // Use Vite environment variable
};

const userPool = new CognitoUserPool(poolData);

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('Sign in successful:', result);
        localStorage.setItem("isAuthenticated", "true"); // Store authentication status
        navigate("/dashboard"); // Redirect to dashboard on successful sign-in
      },
      onFailure: (err) => {
        setError(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-4" onSubmit={handleSignIn}>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <div className="flex items-center mt-2">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="show-password" className="text-sm text-gray-700">Show Password</label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 ${loading ? "bg-gray-400" : "bg-green-600"} text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
