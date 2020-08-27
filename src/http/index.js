import axios from 'axios'
let instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 6000
});

// 请求拦截
// instance.interceptors.request.use((config) => {
//     if (store.state.user.token) {
//         config.headers.authorization = store.state.user.token;
//     }
//     return config;
// },
//     (err) => {
//         Promise.reject(err);
//     })

// instance.interceptors.response.use((res) => {
//     if (res.data.code == 403) {
//         router.push("/login")
//     }
//     return res;
// },
//     (err) => {
//         Promise.reject(err);
//     })

function get(url, params) {
    return instance.get(url, {
        params
    })
}

function post(url, data) {
    return instance.post(url, data)
}

export default {
    get,
    post
}