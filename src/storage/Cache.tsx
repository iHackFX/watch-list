import { FilmData, GetFilmData } from "../apis/Kinopoisk";
import storage from "./StorageService";


async function getCachedFilm(id: number){
    var data = await storage.get('kinopoisk') as GetFilmData[] || [] as GetFilmData[];
    var filtred = data.filter(function(item) { return item.kinopoiskId === id; });
    return filtred[0] || null;
}

async function appendFilmCache(data: GetFilmData) {
    var arr = await storage.get('kinopoisk') as GetFilmData[] || [] as GetFilmData[];
    arr.push(data);
    await storage.set("kinopoisk", arr);
}

async function getCachedFilms() {
    return await storage.get('kinopoisk');
}

export {getCachedFilm, getCachedFilms, appendFilmCache}