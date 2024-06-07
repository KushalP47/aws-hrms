import { CognitoUserPool } from "amazon-cognito-identity-js";
import conf from "../conf/conf.js";

const poolData = {
    UserPoolId: conf.cognitoUserpool,
    ClientId: conf.cognitoUserpoolClient,
};

export const userPool = new CognitoUserPool(poolData);