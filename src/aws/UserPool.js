import { CognitoUserPool } from "amazon-cognito-identity-js";
import conf from "../conf/conf.js";

const poolData = {
    UserPoolId: "ap-south-1_yXV8rTYcS",
    ClientId: "2kaj8v6sf142qn31bsg6cstda8",
};

export default new CognitoUserPool(poolData);