import axios, { AxiosRequestConfig } from "axios";

async function searchAnimes(query:string) {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: {
            'accept': 'application/json'
        },
    }
    var data = await axios.get("", config)
    return data.data;
}

async function getTopAnimes(page?: number) {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        params: {
            'limit': 5,
            'order': 'ranked',
            'page': page || 1
        },
        headers: {
            'accept': 'application/json'
        },
    }
    var data = await axios.get("https://shikimori.one/api/animes", config)
    console.log(data.data);
    return data.data;
}

interface Animes {
    id?: number,
    name: string,
    russian?: string,
    image: {
        original: string,
        preview: string,
        x96: string,
        x48: string
    },
    url: string,
    kind: string,
    score: string,
    status: string,
    episodes: number,
    episodes_aired?: number,
    aired_on: string,
    released_on?: string
}

export { searchAnimes, getTopAnimes };
export type { Animes };