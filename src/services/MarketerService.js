import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/marketer' : '//localhost:3000/api/marketer';

export default {
    getMarketers,
    getMarketerByEmail,
    getMarketerById,
    saveMarketer,
    deleteMarketer,
    validateEmail,
}

function getMarketers(sortParam = 'createdAt') {
    return axios.get(`${BASE_URL}/?sort=${sortParam}`)
        .then(res => res.data);
}

function getMarketerByEmail(email) {
    return axios.get(`${BASE_URL}/email/${email} `)
        .then(res => res.data);
}

function getMarketerById(marketerId) {
    return axios.get(`${BASE_URL}/id/${marketerId} `)
        .then(res => res.data);
}


function saveMarketer(marketerData) {
    marketerData.createdAt = Date.now();
    return axios.post(`${BASE_URL}`, marketerData).then(res => res.data);
}

function deleteMarketer(marketerId) {
    return axios.delete(`${BASE_URL} /${marketerId}`)
}

function validateEmail(email) {
    return (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email));
}




