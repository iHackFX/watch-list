import { IonItem } from "@ionic/react";
import "./List.css"
import { FilmData } from "../apis/Kinopoisk";
import { Anime } from "../apis/Shikimori";

const FilmItem: React.FC<FilmItemProps> = ({ data }) => {
    return (
        <IonItem routerLink={"/film/" + (data.filmId || data.kinopoiskId || "")}>
        <div className="FilmItem center">
                <div className="FilmItemContainer">
                    <p>
                        <img className="FilmItem image"
                            src={data.posterUrlPreview}
                            alt={data.nameRu || data.nameEn || data.nameOriginal || ""}
                        /><br />
                        <b>
                            {
                                data.nameRu || data.nameEn || data.nameOriginal || ""
                            }
                        </b> <br />
                        {
                            data.rating || data.ratingKinopoisk || data.ratingImdb ?
                                "Рейтинг: " +
                                (data.rating || data.ratingKinopoisk || data.ratingImdb) + " "
                                : ""
                        }
                        {data.filmLength ? "Длительность " + data.filmLength : ""} <br />
                        Год выхода: {data.year}
                    </p>
                </div>
            </div>
        </IonItem>
    );
}

const AnimeItem: React.FC<AnimeItemProps> = ({ data }) => {
    return (
        <IonItem routerLink={"/anime/" + data.id}>
            <div className="FilmItem center">
                <div className="FilmItemContainer">
                    <p>
                        <img
                            className="FilmItem image"
                            src={"https://shikimori.one/" + data.image.original} alt={data.russian || data.name || ""}
                        /><br />
                        <b>
                            {
                                data.russian || data.name || ""
                            }
                        </b> <br />
                        {data.name || ""} <br />
                        Рейтинг: {data.score} Эпизоды {data.episodes} <br />
                        {data.released_on ? "Дата выхода: " + (new Date(data.released_on).toLocaleDateString()) + " " : ""}
                        {data.status ? "Статус: " + data.status?.toString() : ""}
                    </p>
                </div>
            </div>
        </IonItem>
    );
}

type FilmItemProps = {
    data: FilmData
}

type AnimeItemProps = {
    data: Anime
}

export { FilmItem, AnimeItem }