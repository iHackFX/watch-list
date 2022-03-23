import { FilmData, getDataToFilmData, GetFilmData } from '../apis/Kinopoisk';
import { getSavedByType, getTypeOfSavedItem, save, SavedData } from './Remember';
var d = getDataToFilmData({
    kinopoiskId: 3498,
    imdbId: "tt0167260",
    nameRu: "Властелин колец: Возвращение короля",
    nameEn: null,
    nameOriginal: "The Lord of the Rings: The Return of the King",
    posterUrl: "https://kinopoiskapiunofficial.tech/images/posters/kp/3498.jpg",
    posterUrlPreview: "https://kinopoiskapiunofficial.tech/images/posters/kp_small/3498.jpg",
    reviewsCount: 243,
    ratingGoodReview: 95.3,
    ratingGoodReviewVoteCount: 210,
    ratingKinopoisk: 8.6,
    ratingKinopoiskVoteCount: 510381,
    ratingImdb: 8.9,
    ratingImdbVoteCount: 1757991,
    ratingFilmCritics: 8.7,
    ratingFilmCriticsVoteCount: 274,
    ratingAwait: null,
    ratingAwaitCount: 0,
    ratingRfCritics: 100,
    ratingRfCriticsVoteCount: 8,
    webUrl: "https://www.kinopoisk.ru/film/3498/",
    year: 2003,
    filmLength: 201,
    slogan: "There can be no triumph without loss. No victory without suffering. No freedom without sacrifice",
    description: "Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.",
    shortDescription: "Арагорн штурмует Мордор, а Фродо устал бороться с чарами кольца. Эффектный финал саги, собравший 11 «Оскаров» ",
    editorAnnotation: null,
    isTicketsAvailable: false,
    productionStatus: null,
    type: "FILM",
    ratingMpaa: "pg13",
    ratingAgeLimits: "age12",
    countries: [
        {
            country: "США"
        },
        {
            country: "Новая Зеландия"
        }
    ],
    genres: [
        {
            genre: "драма"
        },
        {
            genre: "приключения"
        },
        {
            genre: "фэнтези"
        }
    ],
    startYear: null,
    endYear: null,
    serial: false,
    shortFilm: false,
    completed: false,
    hasImax: false,
    has3D: false,
    lastSync: "2022-02-28T06:59:31.647901"
} as GetFilmData)

it("Save data", async () => {
    if (d == null) throw '';
    let _a = await save(0, d);
    expect(_a).toBe(true);
})

it("getSavedByType func", async () => {
    var saved = await getSavedByType(0);
    expect(saved).not.toBe(null);
    saved = saved?.filter((val, idx, arr) => {
        if (val.api != 'kinopoisk') return false;
        return (val.data as FilmData).filmId === d?.filmId;
    }) || null
    expect(saved?.length).toBeGreaterThan(0);
})

it("getData", async () => {
    if (d == null) throw '';
    expect(await getTypeOfSavedItem(d)).toEqual(0);
})