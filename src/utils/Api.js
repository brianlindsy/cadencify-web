const axios = require('axios');

    export const get = async (url, token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.get(url, config).then(handleResponse);
    }

    export const post = async (url, body, token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.post(url, body, config).then(handleResponse);
    }

    export const put = async (url, body, token) => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return axios.put(url, body, config).then(handleResponse);    
    }

    // helper functions

    const handleResponse = (response) => {
        if(response.data){
            console.log(response.data)
            return response.data
        }
    }