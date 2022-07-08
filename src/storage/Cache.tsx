import { FilmData, GetFilmData } from "../apis/Kinopoisk";
import { GetAnimeData } from "../apis/Shikimori";
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
    return await storage.get('kinopoisk') as GetFilmData[] || [] as GetFilmData[];
}

async function getCachedAnime(id: number){
    var data = await storage.get('shikimori') as GetAnimeData[] || [] as GetAnimeData[];
    var filtred = data.filter(function(item) { return item.id === id; });
    return filtred[0] || null;
}

async function appendAnimeCache(data: GetAnimeData) {
    var arr = await storage.get('shikimori') as GetAnimeData[] || [] as GetAnimeData[];
    arr.push(data);
    await storage.set("shikimori", arr);
}

async function getCachedAnimes() {
    return await storage.get('shikimori') as GetAnimeData[] || [] as GetAnimeData[];
}

export {getCachedFilm, getCachedFilms, appendFilmCache, getCachedAnime, appendAnimeCache, getCachedAnimes};