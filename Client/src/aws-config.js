import AWS from "aws-sdk";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

export const userPool = new CognitoUserPool(poolData);

// Optionally configure AWS SDK
AWS.config.update({
  region: "eu-north-1", // e.g. 'us-east-1'
});
