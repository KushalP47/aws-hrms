import apiCall from "./utils/ApiCall.js"

export class LeaveService {
    url;

    constructor() {
        this.url = "https://ryktvuwpmj.execute-api.ap-south-1.amazonaws.com/leaves/api/v1/leaves";
    }

    async getLeaveList({token}) {
        const method = "GET";
        const data = await apiCall({ url: this.url, method, token });
        return data;
    }

    async getLeave({token, id}) {
        const method = "GET";
        const url = `${this.url}?id=${id}`;
        const data = await apiCall({ url, method, token });
        console.log(data);
        return data;
    }

    async createLeave({token, body}) {
        const method = "POST";
        console.log(body);
        const data = await apiCall({ url: this.url, method, token, body });
        if(data) return true;
        console.log(data);
        return false;
    }

    async updateLeave({token, body}) {
        const method = "PUT";
        const data = await apiCall({ url: this.url, method, token, body });
        return data;
    }

    async deleteLeave({token, id}) {
        const method = "DELETE";
        const url = `${this.url}?id=${id}`;
        const data = await apiCall({ url: url, method, token, body });
        return data;
    }

}

const leaveService = new LeaveService();

export default leaveService;