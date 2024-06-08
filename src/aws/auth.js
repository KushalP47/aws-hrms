import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import apiCall from './utils/ApiCall.js';

export class AuthService{
    pool;

    constructor(){
        this.pool = new CognitoUserPool({
            UserPoolId: "ap-south-1_yXV8rTYcS",
            ClientId: "2kaj8v6sf142qn31bsg6cstda8",
        });
    }

    // Create Account Service
    async createAccount({ email, password }) {
        return await new Promise((resolve, reject) => {
            this.pool.signUp(email, password, [], null, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Confirm Sign Up Service
    async confirmSignUp({ email, code }) {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username: email, Pool: this.pool });
            user.confirmRegistration(code, true, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Login Service
    async login({ email, password }){
        try {
            const user = new CognitoUser({ Username: email, Pool: this.pool });
            const authDetails = new AuthenticationDetails({ Username: email, Password: password });
            
            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    console.log("onSuccess:", data);
                    return data;
                },
                onFailure: err => {
                    console.error("onFailure:", err);
                    throw err;
                },
                newPasswordRequired: data => {
                    console.log("newPasswordRequired:", data);
                    return data;
                }
            })

            
            return true;
        } catch (error) {
            console.log("AWS Error :: Login :: ", error);
            throw error;
        }
    }

    // Get Current User Service
    async getCurrentUser(){
        try {
            return this.pool.getCurrentUser();
        } catch (error) {
            console.log("AWS Error :: Get Current User :: ", error);
            throw error;
        }
    }

    async getSession(){
        try {
            const user = await this.getCurrentUser();
            console.log("AWS :: Get Session :: User :: ", user);
            if (user) {
                const session = user.getSession((err, session) => {
                    return session;
                });
                return session;
            } 
        } catch (error) {
            console.error('Error getting session:', error);
            throw error; // or return a specific value or handle the error as needed
        }
    };
    

    // Logout Service
    async logout(){
        try {
            const user = await this.getCurrentUser();
            if (user) {
                user.signOut();
                console.log("AWS :: Logout :: Success");
            }
        } catch (error) {
            console.log("AWS Error :: Logout :: ", error);
            throw error;
        }
    }

    // get User Role Service
    async getUserRole({ email, token }) {
    try {
        const url = `https://n99pajwya2.execute-api.ap-south-1.amazonaws.com/dev/admin?email=${email}`;
        const method = "GET";
        console.log("Get User Role :: ", email, method, token);

        const data = await apiCall({ url, method, token });
        console.log("Promise resolved with data:", data);
        // Check if the data has the isAdmin property and return its value
        return data.isAdmin || false;
    } catch (error) {
        console.error("AWS Error :: Get User Role :: ", error);
        throw error;
    }
};


};

const authService = new AuthService();

export default authService;