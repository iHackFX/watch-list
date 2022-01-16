import axios, { AxiosRequestConfig } from "axios";

async function getTopFilms() {
    var config: AxiosRequestConfig<any> = {
        method: "get",
        headers: {
            'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY || "",
            'accept': 'application/json',
        },
    }
    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films/top", config)
    return data.data.films as Array<FilmData>;
}

async function getTopSerials(page: number = 1) {
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
        headers: {
            'X-API-KEY': process.env.REACT_APP_KINOPOISK_API_KEY || "",
            'accept': 'application/json',
        },
    }
    var data = await axios.get("https://kinopoiskapiunofficial.tech/api/v2.2/films", config)
    console.log(data)
    return data.data.items as Array<FilmData>;
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


export { getTopFilms, getTopSerials };
export type { FilmData }