import { IonItem, IonRouterLink, useIonRouter } from "@ionic/react";
import "./List.css"
import { FilmData } from "../apis/Kinopoisk";
import { Animes } from "../apis/Shikimori";

const FilmItem: React.FC<FilmItemProps> = ({ data }) => {
    return (
        <IonItem routerLink={"/film/" + data.filmId}>
            <div className="FilmItem center">
                <div className="FilmItemContainer">
                    <p>
                        <div className="FilmItem image">
                            <img src={data.posterUrlPreview} alt={data.nameRu || data.nameEn || data.nameOriginal || ""} /><br />
                        </div>
                        <b>
                            {
                                data.nameRu || data.nameEn || data.nameOriginal || ""
                            }
                        </b> <br />
                        Рейтинг: {data.rating} Длительность {data.filmLength} <br />
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
                        <div className="FilmItem image">
                            <img src={"https://shikimori.one/" + data.image.original} alt={data.russian || data.name || ""} /><br />
                        </div>
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

interface FilmItemProps {
    data: FilmData
}

interface AnimeItemProps {
    data: Animes
}

export { FilmItem, AnimeItem }