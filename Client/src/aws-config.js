import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);

// Dynamically import AWS SDK
export const getAWS = async () => {
  const AWS = await import("aws-sdk");
  AWS.config.update({
    region: "eu-north-1", // e.g. 'us-east-1'
  });
  return AWS;
};

