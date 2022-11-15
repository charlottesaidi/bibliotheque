import { Core, IResponse, RequestOptions } from './core';

const api = new Core();

export const get = async (apiPath: string, options: RequestOptions ) => {
    const response: IResponse = {};

    const url = options.routeParam ? `${apiPath}/${options.routeParam}` : apiPath;
    try {
            if(options.storageKey && sessionStorage.getItem(options.storageKey)) {
                response['data'] = await JSON.parse(sessionStorage.getItem(options.storageKey) || '{}');

            } else {
                const params = options.apiParams ? options.apiParams : null;
                await api.get(url, params)
                .then(res => {
                    response['data'] = res.data;
                    response['success'] = true;
                    options.storageKey && sessionStorage.setItem(options.storageKey, JSON.stringify(res.data));
                }).catch(err => {
                        response['error'] = err && err.response && err.response.data ? err.response.data : err.response || err;
                });
            }
    } catch (err: any) {
        response['error'] = err.message;
    }
    return response;
};