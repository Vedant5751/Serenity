import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"; // Import AuthenticationDetails
import { userPool } from "../aws-config"; // Import your user pool configuration
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { login, checkAuthStatus } = useAuth();

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    // Create AuthenticationDetails object
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    // Call authenticateUser with the authDetails object
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        setLoading(false); // Reset loading state
        setError(""); // Clear error message
        login();
        navigate("/dashboard");
      },
      onFailure: (err) => {
        setLoading(false); // Reset loading state
        setError(err.message || JSON.stringify(err)); // Set error message
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Display error message */}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="helloworld@email.com"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)} // Handle change
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password} // Controlled input
              onChange={(e) => setPassword(e.target.value)} // Handle change
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
              <label htmlFor="show-password" className="text-sm text-gray-700">
                Show Password
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 ${
              loading ? "bg-gray-400" : "bg-green-600"
            } text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Signing In..." : "Sign In"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
