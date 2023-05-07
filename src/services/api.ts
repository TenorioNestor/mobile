import axios from 'axios';

const api = axios.create({
    //baseUrl:'http://localhost'
    baseURL:'http://192.168.0.116:3333'
})

export {api};