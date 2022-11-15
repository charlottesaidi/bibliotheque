import axios from "axios";
import config from "@config/config";

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.get['Content-type'] = 'application/json';

export interface IResponse {
    success?: boolean;
    data?: any;
    error?: any;
    code?: any;
}

export interface RequestOptions {
    storageKey?: string,
    routeParam?: string,
    apiParams?: any
}

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const errorResponse = {
        message: '',
        code: 0
    };
    if (error && error.response && error.response.status === 403) {
        window.location.href = '/forbidden';
    } else {
        switch (error.response.status) {
            case 400:
                errorResponse.code = 400;
                errorResponse.message = 'Une erreur est survenue';
                break;
            case 401:
                errorResponse.code = 401;
                errorResponse.message = 'Identifiants ou mot de passe invalide';
                break;
            case 403:
                errorResponse.code = 403;
                errorResponse.message = 'Accès refusé';
                break;
            case 404:
                errorResponse.code = 404;
                errorResponse.message = 'La bibliothèque est vide';
                break;
            default:
                errorResponse.message = error.response && error.response.data ? error.response.data['message'] : error.message || error;
        }
        return Promise.reject(errorResponse);
    }
});

const AUTH_SESSION_KEY = 'token';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string | null) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromCookie = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? user : null;
};

/*
Check if token available in session
*/
const user = getUserFromCookie();
if (user) {
    setAuthorization(user);
}

class Core {
    /**
     * Fetches data from given url
     */
    get = (url: string, params: any) => {
        let response;
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };

    getFile = (url: string, params: any) => {
        let response;
        if (params) {
            const queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls: string, params: any) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */
    create = (url: string, data: any) => {
        return axios.post(url, data);
    };

    /**
     * Updates data
     */
    update = (url: string, data: any) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url: string) => {
        return axios.delete(url);
    };

    /**
     * post given data to url with file
     */
    createWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };
}

export { Core, setAuthorization };