const apiCall = async ({ url, method, token }) => {
    try {
        console.log("API Call :: ", url, method, token);
        const response = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response :: ", data);
        return data;
    } catch (error) {
        console.log("API Error :: ", error);
        throw error;
    }
};

export default apiCall;
