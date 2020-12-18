import axis from 'axios';

const api = axis.create({
    baseURL: "http://localhost:3333",
});

export default api;