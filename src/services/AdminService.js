export default {
    loginAdmin,

}

function loginAdmin({ username, password }) {
    return (username === 'admin' && password === 'admin');
}