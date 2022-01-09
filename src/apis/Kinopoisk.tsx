import axios, { AxiosRequestConfig } from "axios";

async function getTopFilms() {
    // var data: any;
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

interface FilmData {
    filmId: number,
    nameRu: string,
    nameEn: string,
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
    rating: number,
    ratingVoteCount: number,
    posterUrl: string,
    posterUrlPreview: string,
    ratingChange?: any
}


export { getTopFilms };
export type { FilmData }