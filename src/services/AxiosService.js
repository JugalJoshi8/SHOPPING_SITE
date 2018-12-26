import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'https://localhost:5000/'
});

export default axiosService;