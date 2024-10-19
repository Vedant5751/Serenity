import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser } from "amazon-cognito-identity-js";
import { userPool } from "../aws-config"; // Import your user pool configuration

export default function ConfirmUser() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, true, (err) => {
      setLoading(false);
      if (err) {
        setError(err.message || JSON.stringify(err));
      } else {
        // Confirmation successful, navigate to sign-in or dashboard
        navigate("/signin");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Verification Code Sent to Your Email. Please Enter the Code Below.</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form className="space-y-4" onSubmit={handleConfirm}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmation Code
            </label>
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
            className={`w-full py-2 px-4 ${
              loading ? "bg-gray-400" : "bg-green-600"
            } text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
}
