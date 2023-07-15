import axios from 'axios';

const api = axios.create({
    //baseUrl:'http://localhost'
<<<<<<< HEAD
    baseURL:'http://192.168.0.105:3333'
=======
    baseURL:'http://192.168.0.116:3333'
>>>>>>> c52ce036cd474debcc386be201a51c95b287ec42
})

export {api};