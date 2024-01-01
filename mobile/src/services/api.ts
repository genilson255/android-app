import axios from "axios";

const api = axios.create({
    // baseURL: "https://192.168.1.122:3333"
    baseURL: "http://192.168.1.122:3333"
})

export { api }
