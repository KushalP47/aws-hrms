import apiCall from './utils/ApiCall.js';

export class FeedbackService {
    url;

    constructor() {
        this.url = 'https://l0qg0ziyq6.execute-api.ap-south-1.amazonaws.com/feedback/api/v1/feedback';
    }

    async getFeedbackList({token}) {
        try {
            const url = this.url;
            const method = 'GET';
            const data = await apiCall({ url, method, token });
            console.log(data);
        return data;
        } catch (error) {
            console.log("Error in getFeedbackList :: ", error);
        }
    }

    async getFeedbackById({token, id}) {
        try {
            const url = `${this.url}?id=${id}`;
            const method = 'GET';
            const data = await apiCall({ url, method, token });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in getFeedbackById :: ", error);
        }
    }

    async createFeedback({token, body}) {
        try {
            const url = this.url;
            const method = 'POST';
            const data = await apiCall({ url, method, token, body });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in createFeedback :: ", error);
        }
    }

    async updateFeedback({token, body}) {
        try {
            const url = this.url;
            const method = 'PUT';
            const data = await apiCall({ url, method, token, body });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in updateFeedback :: ", error);
        }
    }

    async deleteFeedback({token, id}) {
        try {
            const url = `${this.url}?id=${id}`;
            const method = 'DELETE';
            const data = await apiCall({ url, method, token });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in deleteFeedback :: ", error);
        }
    }

    
}

const feedbackService = new FeedbackService();

export default feedbackService;