import { FilmData } from "../apis/Kinopoisk";
import { Anime } from "../apis/Shikimori";
import { AnimeItem, FilmItem } from "../components/List";
import storage from "./StorageService";

type typeOfCategories = 0 | 1 | 2;

enum categoriesByName {
    "watched" = 0,
    "watch" = 1,
    "need-to-watch" = 2
}

enum categoryByTypeId {
    "watched",
    "watch",
    "need-to-watch"
}

type SavedData = {
    type: typeOfCategories
    api: "kinopoisk" | "shikimori",
    data: FilmData | Anime
}

/**
 * Получить тип данных в сохраненных
 * @var data Данные которые мы ищем в сохранненых
 * @var key Ключ по которому искать
 * @returns 
 */
async function getTypeOfSavedItem(data: FilmData | Anime): Promise<typeOfCategories | undefined> {
    var inStorage = undefined;
    var storages: Array<SavedData[] | null> = [
        await getSavedByType(0),
        await getSavedByType(1),
        await getSavedByType(2)
    ];
    storages.map((val, idx) => {
        if (val === null) return;
        var inData = val.filter((item) => {
            if ('episodes' in item.data) {
                var animeId: number = item.data.id || 0;
                return animeId == (data as Anime).id;
            }
            if ('filmId' in item.data) {
                var filmId: number = item.data.filmId || 0;
                return filmId == (data as FilmData).filmId;
            }
            return false;
        })
        if (inData.length > 0) {
            inStorage = idx;
        }
    })
    return inStorage;
}

async function getSavedByType(type: typeOfCategories) {
    let temp: SavedData[] = await storage.get(categoryByTypeId[type]) as SavedData[];
    return (temp || null);
}

async function save(type: typeOfCategories, data: FilmData | Anime) {
    if ('episodes' in data)
        saveDataInStorage({ type, api: "shikimori", data });
    if ('filmId' in data)
        saveDataInStorage({ type, api: "kinopoisk", data });
    else
        throw "Не возможно записать данные неизвестного типа";
    return true;
}


async function saveDataInStorage(data: SavedData) {
    var _c = await getSavedByType(data.type);
    if (_c !== null)
        await storage.set(categoryByTypeId[data.type], [..._c, data]);
    else
        await storage.set(categoryByTypeId[data.type], [data]);
}

async function deleteFromStorage(data: FilmData | Anime) {
    var type = await getTypeOfSavedItem(data);
    if (type === undefined) return false;
    var storageData = await getSavedByType(type);
    if (storageData === null) return false;
    storageData = storageData.filter((val) => {
        if (val.api == 'kinopoisk')
            if ('filmId' in data)
                return (val.data as FilmData).filmId !== data.filmId;
        if (val.api == 'shikimori')
            if ('episodes' in data)
                return (val.data as Anime).id !== data.id;
    })

    await storage.set(categoryByTypeId[type], storageData);
}

async function getListOfRememberedType(type: "watched" | "watch" | "need-to-watch") {
    let list: JSX.Element[] = [];
    let data = await storage.get(type) as SavedData[];
    if (data === null) return data;
    for(let i = 0; i < data.length; i++){
        switch(data[i].api){
            case 'kinopoisk':
                list.push(<FilmItem key={i} data={data[i].data as FilmData} />);
                break;
            case 'shikimori':
                list.push(<AnimeItem key={i} data={data[i].data as Anime} />);
                break;
            default:
                continue;
        }
    }
    return list;
}

export { save, getSavedByType, getTypeOfSavedItem, deleteFromStorage, getListOfRememberedType };
export type { SavedData, typeOfCategories };