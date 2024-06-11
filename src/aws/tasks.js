export class TaskService{
    url;

    constructor() {
        this.url = 'https://c84lyflfn2.execute-api.ap-south-1.amazonaws.com/tasks/api/v1/tasks';
    }

    async getTasksList({token}) {
        try {
            const url = this.url;
            const method = 'GET';
            const data = await apiCall({ url, method, token });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in getTasksList :: ", error);
        }
    }

    async getTaskById({token, id}) {
        try {
            const url = `${this.url}?id=${id}`;
            const method = 'GET';
            const data = await apiCall({ url, method, token });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in getTaskById :: ", error);
        }
    }

    async createTask({token, body}) {
        try {
            const url = this.url;
            const method = 'POST';
            const data = await apiCall({ url, method, token, body });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in createTask :: ", error);
        }
    }

    async updateTask({token, body}) {
        try {
            const url = this.url;
            const method = 'PUT';
            const data = await apiCall({ url, method, token, body });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in updateTask :: ", error);
        }
    }

    async deleteTask({token, id}) {
        try {
            const url = `${this.url}?id=${id}`;
            const method = 'DELETE';
            const data = await apiCall({ url, method, token });
            console.log(data);
            return data;
        } catch (error) {
            console.log("Error in deleteTask :: ", error);
        }
    }

}

const taskService = new TaskService();

export default taskService;