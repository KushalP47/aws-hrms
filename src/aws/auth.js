// authService.js
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import apiCall from './utils/ApiCall.js';

export class AuthService {
    pool;

    constructor() {
        this.pool = new CognitoUserPool({
            UserPoolId: "ap-south-1_yXV8rTYcS",
            ClientId: "2kaj8v6sf142qn31bsg6cstda8",
        });
    }

    async createAccount({ email, password }) {
        return new Promise((resolve, reject) => {
            this.pool.signUp(email, password, [], null, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async confirmSignUp({ email, code }) {
        return new Promise((resolve, reject) => {
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

    async login({ email, password }) {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username: email, Pool: this.pool });
            const authDetails = new AuthenticationDetails({ Username: email, Password: password });

            user.authenticateUser(authDetails, {
                onSuccess: data => {
                    resolve(data);
                },
                onFailure: err => {
                    reject(err);
                },
                newPasswordRequired: data => {
                    resolve(data);
                }
            });
        });
    }

    async getCurrentUser() {
        return this.pool.getCurrentUser();
    }

    async getSession() {
        try {
            const user = await this.getCurrentUser();
            if (user) {
                return new Promise((resolve, reject) => {
                    user.getSession((err, session) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(session);
                        }
                    });
                });
            }
            return null;
        } catch (error) {
            console.error('Error getting session:', error);
            throw error;
        }
    }

    async logout() {
        const user = await this.getCurrentUser();
        if (user) {
            user.signOut();
            console.log("AWS :: Logout :: Success");
        }
    }

    async getUserRole({ email, token }) {
        const url = `https://n99pajwya2.execute-api.ap-south-1.amazonaws.com/dev/admin?email=${email}`;
        const method = "GET";
        const data = await apiCall({ url, method, token });
        return data.isAdmin || false;
    }
}

const authService = new AuthService();

export default authService;
