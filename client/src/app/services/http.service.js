import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../../config.json";
// import authService from "./auth.service";
// import {
//     getRefreshToken,
//     getTokenExpiresDate,
//     getAccessToken,
//     setTokens
// } from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.API_BASE_URL
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFakeServer) {
            // const containSlash = /\/$/gi.test(config.url);
            // config.url =
            //     (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            // const expiresDate = getTokenExpiresDate();
            // const refreshToken = getRefreshToken();
            // if (refreshToken && expiresDate < Date.now()) {
            //     const data = await authService.refresh();
            //     setTokens({
            //         refreshToken: data.refresh_token,
            //         idToken: data.id_token,
            //         expiresIn: data.expires_in,
            //         localId: data.user_id
            //     });
            // }
            // const accessToken = getAccessToken();
            // if (accessToken) {
            //     config.params = { ...config.params, auth: accessToken };
            // }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// function transformData(data) {
//     return data && !data._id
//         ? Object.keys(data).map(key => ({
//               ...data[key]
//           }))
//         : data;
// }

http.interceptors.response.use(
    res => {
        // if (configFile.isFakeServer) {
        //     res.data = { content: transformData(res.data) };
        // }
        return res;
    },
    error => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
            toast.error("Что-то пошло не так, попробуйте позже.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
