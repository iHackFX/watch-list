import { IonItem, IonRouterLink, useIonRouter } from "@ionic/react";
import "./List.css"
import { FilmData } from "../apis/Kinopoisk";
import { Animes } from "../apis/Shikimori";

const FilmItem: React.FC<FilmItemProps> = ({ data }) => {
    return (
        <IonRouterLink href={"/film/" + data.filmId} color="unset">
            <div className="FilmItem">

                <div className="FilmItemContainer">
                    <p>
                        <img src={data.posterUrlPreview} alt={data.nameRu || data.nameEn || data.nameOriginal || ""} /><br />
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
        </IonRouterLink>
    );
}

const AnimeItem: React.FC<AnimeItemProps> = ({ data }) => {
    return (
        <IonRouterLink href={"/anime/" + (data.id?.toString())} color="unset">
            <div className="FilmItem">
                <div className="FilmItemContainer">
                    <p>
                        <img src={"https://shikimori.one/" + data.image.original} alt={data.russian || data.name || ""} /><br />
                        <b>
                            {
                                data.name || ""
                            }
                        </b> <br />
                        Рейтинг: {data.score} Эпизоды {data.episodes} <br />
                        {data.released_on ? "Дата выхода: " + data.released_on?.toString() : ""}
                    </p>
                </div>
            </div>
        </IonRouterLink>
    );
}

interface FilmItemProps {
    data: FilmData
}

interface AnimeItemProps {
    data: Animes
}

export { FilmItem, AnimeItem }