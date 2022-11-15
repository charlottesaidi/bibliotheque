import { useState } from 'react';
import { Core, IResponse } from '../core';
import {FieldValues} from "react-hook-form";

const api = new Core();

export const parseJwt = (token: any) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

export const isAdmin = (token: string | null) => {
	const parsedToken = parseJwt(token);
    if(parsedToken.roles.includes('ROLE_ADMIN')) {
        return true;
    } else {
        return false;
    }
}

export const isTokenExpired = (token: string | null) => {
	const parsedToken = parseJwt(token);
    if (parsedToken.exp * 1000 < Date.now()) {
        logoutUser();
    }
}

export const useToken = () => {
    const getToken = () => {
      const userToken = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
      return userToken;
    };
  
    const [token, setToken] = useState(getToken());
  
    const saveToken = (userToken: string) => {
      sessionStorage.setItem('token', userToken);
      setToken(userToken);
    };
  
    return {
        setToken: saveToken,
        token
    }
}

export const signup = async (params: FieldValues) => {
    const response: IResponse = {};
    await api.create('/register', params).then((res) => {
        response['data'] = res.data.token;
    }).catch((err) => {
        response['error'] = err;
    });
    return response;
}

export const loginUser = async (params: FieldValues) => {
        const response: IResponse = {};
        await api.create('/login_check', params).then((res) => {
            response['data'] = res.data.token;
        }).catch((err) => {
            err == undefined ? response['error'] = 'Une erreur est survenue lors de la connexion au serveur' : response['error'] = err;
        });
        return response;
}

export const forgotPassword = async (params: FieldValues) => {
    const response: IResponse = {};
    await api.create('/forget-password', params).then((res) => {
        response['data'] = res.data.token;
    }).catch((err) => {
        response['error'] = err;
    });
    return response;
}

export const logoutUser = () => {
    sessionStorage.removeItem('token');
    location.reload();
}