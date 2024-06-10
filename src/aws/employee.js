import apiCall from "./utils/ApiCall.js"

export class EmployeeService{
    url;

    constructor() {
        this.url = "https://yxlgcqne0h.execute-api.ap-south-1.amazonaws.com/employee/api/v1/employee";
    }

    async getEmployeeList({token}) {
        const method = "GET";
        const data = await apiCall({ url: this.url, method, token });
        return data;
    }

    async getEmployee({token, id}) {
        const method = "GET";
        const url = `${this.url}?id=${id}`;
        const data = await apiCall({ url, method, token });
        console.log(data);
        return data;
    }

    async createEmployee({token, body}) {
        const method = "POST";
        console.log(body);
        const data = await apiCall({ url: this.url, method, token, body });
        if(data) return true;
        console.log(data);
        return false;
    }

    async updateEmployee({token, body}) {
        const method = "PUT";
        const data = await apiCall({ url: this.url, method, token, body });
        return data;
    }

    async deleteEmployee({token, id}) {
        const method = "DELETE";
        const url = `${this.url}?id=${id}`;
        const data = await apiCall({ url: url, method, token, body });
        return data;
    }

}

const employeeService = new EmployeeService();

export default employeeService;