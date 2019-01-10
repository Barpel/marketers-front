import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/marketer' : '//localhost:3000/api/marketer';

export default {
    getMarketers,
    getMarketerByEmail,
    getMarketerById,
    saveMarketer,
    deleteMarketer,
    validateEmail
}

function getMarketers() {
    return axios.get(BASE_URL)
        .then(res => res.data);
}

function getMarketerByEmail(email) {
    return axios.get(`${BASE_URL}/email/${email}`)
        .then(res => res.data);
}

function getMarketerById(marketerId) {
    return axios.get(`${BASE_URL}/id/${marketerId}`)
        .then(res => res.data);
}


function saveMarketer(marketerData) {
    var marketer = getMarketerByEmail(marketerData.email)

    // if (marketerData._id) {
    // return 'Marketer already registered';
    //IN CASE WE WILL WANT TO ENABLE UPDATING MARKETER
    // return axios.put(`${BASE_URL}/${marketerData._id}`, marketerData)
    // .then(res => res.data) 
    // } else if (isEmailValid && !marketer._id) {
    //     return axios.post(`${BASE_URL}`, marketerData).then(res => res.data);
    // }
    if (!marketer._id) {
        return axios.post(`${BASE_URL}`, marketerData).then(res => res.data);
    }

}

function deleteMarketer(marketerId) {
    console.log('deleting', marketerId)
    return axios.delete(`${BASE_URL}/${marketerId}`)
}

function validateEmail(email) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

