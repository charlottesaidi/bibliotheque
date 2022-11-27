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
                        response['code'] = err && err.code || err;
                        response['error'] = err && err.message|| err;
                });
            }
    } catch (err: any) {
        response['error'] = err.message;
    }
    return response;
};

export const upload = async (apiPath: string, data: any) => {
    const response: IResponse = {};
    try {
        await api.createWithFile(apiPath, data).then(res => {
            response['data'] = res.data
            response['success'] = true;
        }).catch(err => {
            response['code'] = err && err.code || err;
            response['error'] = err && err.message|| err;
        })
    } catch (err: any) {
        response['error'] = err.message;
    }
    return response;
}

export const deleteResource = async (apiPath: string) => {
    const response: IResponse = {};
    try {
        await api.delete(apiPath).then(res => {
            response['data'] = res.data
            response['success'] = true;
        }).catch(err => {
            response['code'] = err && err.code || err;
            response['error'] = err && err.code === 404 ? 'Ressource introuvable' : err && err.message|| err;
        })
    } catch (err: any) {
        response['error'] = err.message;
    }
    return response;
}