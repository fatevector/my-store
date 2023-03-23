import axios from "axios";
import { toast } from "react-toastify";

import configFile from "../../config.json";
import authService from "./auth.service";
import {
    getRefreshToken,
    getTokenExpiresDate,
    getAccessToken,
    setTokens
} from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.API_BASE_URL
});

http.interceptors.request.use(
    async function (config) {
        let expiresDate = getTokenExpiresDate();
        let refreshToken = getRefreshToken();
        let isExpired = refreshToken && expiresDate < Date.now();

        if (configFile.isFakeServer) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            if (isExpired) {
                const data = await authService.refresh();
                setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            if (isExpired) {
                try {
                    const data = await authService.refresh();
                    expiresDate = getTokenExpiresDate();
                    refreshToken = getRefreshToken();
                    isExpired = refreshToken && expiresDate < Date.now();
                    if (isExpired) setTokens(data);
                } catch (error) {}
            }
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    res => {
        if (configFile.isFakeServer) {
            res.data = { content: res.data };
        } else {
            res.data = { content: res.data };
        }
        return res;
    },
    error => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error("Что-то пошло не так, попробуйте позже.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    patch: http.patch,
    delete: http.delete
};

export default httpService;
