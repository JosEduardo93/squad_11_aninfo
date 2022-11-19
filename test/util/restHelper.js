const axios = require('axios');

const getData = (url) => {
    try {
        return axios.get(url);
    } catch (e) {
        console.error('exception occurred while GET', e);
        throw e;
    }
}

const postData = (url, data) => {
    try {
        return axios.post(url, data);
    } catch (e) {
        console.error('exception occurred while POST', e);
        throw e;
    }
}

const putData = async (url, data) => {
    try {
        return await axios.put(url, data);
    } catch (e) {
        console.error('exception occurred while PATCH', e);
        throw e;
    }
}

const deleteData = async (url, data) => {
    try {
        return await axios.delete(url);
    } catch (e) {
        console.error('exception occurred while DELETE', e);
        throw e;
    }
}

module.exports = {
    getData,
    postData,
    putData,
    deleteData
}