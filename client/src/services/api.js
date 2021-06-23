import axios from 'axios';

const api = axios.create({
    baseURL: 'https://show-do-vitao.herokuapp.com/',
})

export default api;