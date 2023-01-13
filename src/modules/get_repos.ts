/**
 *
 * Get repositories from Github
 *
 * return RepoProperties[]
 * */

const BASE_URL = 'https://cdn.jsdelivr.net/gh/jxmked/resources@master/repositories.json';

const func = (url: string = BASE_URL) => {
    return new Promise<RepoProperties[]>(async (resolve: Function, reject: Function) => {
        const res = await fetch(url, {
            method: 'GET'
        });

        if (!res.ok)
            reject({
                status: res.status,
                statusText: res.statusText
            });

        const data = await res.json();

        resolve(data.data as RepoProperties[]);
    });
};

export default func;
