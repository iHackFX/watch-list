import axios, { AxiosRequestConfig } from "axios";

async function searchAnimes(query: string) {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        params: {
            q: query
        },
        headers: {
            'accept': 'application/json'
        },
    }
    var data = await axios.get("https://shikimori.one/api/animes/search", config)
    return data.data as Anime[] || null;
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
    var data = await axios.get("https://shikimori.one/api/animes", config);
    return data.data || null;
}

async function getAnime(id: number) {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: {
            'accept': 'application/json'
        },
    }
    var data = await axios.get("https://shikimori.one/api/animes/" + id, config);
    return data.data || null;
}

function getDataToAnimeData(data: GetAnimeData){
    let anime: Anime;
    anime = {
        id: data.id,
        name: data.name,
        russian: data.russian,
        image: data.image,
        url: data.url,
        kind: data.kind,
        score: data.score,
        status: data.status,
        episodes: data.episodes,
        aired_on: data.aired_on
    }
    return anime;
}

type Anime = {
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
    score: number,
    status: string,
    episodes: number,
    episodes_aired?: number,
    aired_on: string | null,
    released_on?: string
}

type GetAnimeData = {
    id: number,
    name: string,
    russian: string,
    image: {
        original: string,
        preview: string,
        x96: string,
        x48: string
    },
    url: string,
    kind: string,
    score: number,
    status: string,
    episodes: number,
    episodes_aired: number,
    aired_on: string | null,
    released_on: string | null,
    rating: string,
    english?: [
        string | null
    ],
    japanese?: [
        string | null
    ],
    synonyms: string[] | [],
    license_name_ru: string | null,
    duration: number,
    description: string | null,
    description_source: string,
    franchise: string | null,
    favoured: boolean,
    anons: boolean,
    ongoing: boolean,
    thread_id: number,
    topic_id: number,
    myanimelist_id: number,
    rates_scores_stats: [],
    rates_statuses_stats: [],
    updated_at: string,
    next_episode_at: string | null,
    genres: [],
    studios: [],
    videos: [],
    screenshots: [],
    user_rate: string
}

export { searchAnimes, getTopAnimes, getDataToAnimeData };
export type { Anime, GetAnimeData };