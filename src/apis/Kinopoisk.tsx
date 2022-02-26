import axios, { AxiosRequestConfig } from "axios";

const headers = {
    'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY || "",
    'accept': 'application/json',
}

async function getTopFilms() {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: headers,
    }
    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films/top", config)
    return data.data.films as Array<FilmData>;
}

async function getTopSerials(page: number = 1) {
    if (page < 0) return null;
    var config: AxiosRequestConfig<any> = {
        method: "get",
        params: {
            order: "RATING",
            type: "TV_SHOW",
            ratingFrom: 0,
            ratingTo: 10,
            yearFrom: 1000,
            yearTo: 3000,
            page: page
        },
        headers: headers,
    }
    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films", config)
    return data?.data?.items as FilmData[] || null;
}

async function getFilm(id:number):Promise<null | undefined | GetFilmData> {
    if (id == null) return null;
    if (id <= 0) return null;
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: headers,
    }

    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films/" + id, config)
    return data?.data as GetFilmData || null;
}

async function getTrailer(id:number):Promise<null | undefined | GetTrailerData[]> {
    if (id == null) return null;
    if (id <= 0) return null;
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: headers,
    }

    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films/" + id + "/videos", config)
    return data?.data?.items as GetTrailerData[] || null;
}

async function search(q:string):Promise<null | undefined | FilmData[]> {
    if (q == null) return null;
    if (q.length < 1) return null;
    var config: AxiosRequestConfig<any> = {
        method: "get",
        params:{
            "keyword": q,
            "page": 1
        },
        headers: headers,
    }

    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword", config);
    return data.data.films as FilmData[] || null;
}

interface FilmData {
    filmId?: number,
    kinopoiskId?: number,
    nameRu?: string,
    nameEn?: string,
    nameOriginal?: string,
    year: number,
    filmLength: string,
    countries?: [
        {
            country: string
        }
    ],
    genres?: [
        {
            genre: string
        }
    ],
    rating?: number,
    ratingImdb?: number,
    ratingKinopoisk?: number,
    ratingVoteCount: number,
    posterUrl: string,
    posterUrlPreview: string,
    ratingChange?: any
}

interface GetFilmData{
    kinopoiskId: number,
    imdbId: string,
    nameRu: null | string,
    nameEn: null | string,
    nameOriginal: string,
    posterUrl: string,
    posterUrlPreview: string,
    reviewsCount: number | null,
    ratingGoodReview: number | null,
    ratingGoodReviewVoteCount: number | null,
    ratingKinopoisk: number | null,
    ratingKinopoiskVoteCount: number | null,
    ratingImdb: number | null,
    ratingImdbVoteCount: number | null,
    ratingFilmCritics: number | null,
    ratingFilmCriticsVoteCount: number | null,
    ratingAwait: number | null,
    ratingAwaitCount: number | null,
    ratingRfCritics: number | null,
    ratingRfCriticsVoteCount: number | null,
    webUrl: string,
    year: number,
    filmLength: number,
    slogan: string | null,
    description: string | null,
    shortDescription: string | null,
    editorAnnotation: string | null,
    isTicketsAvailable: Boolean,
    productionStatus: string | null,
    type: "FILM" | "TV_SHOW",
    ratingMpaa: number | null,
    ratingAgeLimits: number | null,
    countries: [
        {
            country: string
        }
    ],
    genres: [
        {
            genre: string
        }
    ],
    startYear: string | null,
    endYear: string | null,
    serial: Boolean,
    shortFilm: Boolean,
    completed: Boolean,
    hasImax: Boolean,
    has3D: Boolean,
    lastSync: string
}

interface GetTrailerData {
    url: string,
    name: string
    site: "YOUTUBE" | "KINOPOISK_WIDGET" | "UNKNOWN"
}

export { getTopFilms, getTopSerials, getFilm, getTrailer, search };
export type { FilmData, GetFilmData, GetTrailerData }