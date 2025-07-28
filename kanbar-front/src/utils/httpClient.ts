import axios from 'axios';

const httpClient = axios.create({
    baseURL: "https://kanbar.onrender.com/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default httpClient;