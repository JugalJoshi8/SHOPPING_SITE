import axios from 'axios';

const ajaxService = axios.create({
    baseURL: 'http://localhost:5000/'
});

export default ajaxService;