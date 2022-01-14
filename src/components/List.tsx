import { IonItem, IonRouterLink, useIonRouter } from "@ionic/react";
import "./List.css"
import { FilmData } from "../apis/Kinopoisk";

const FilmItem: React.FC<FilmItemProps> = ({ data }) => {
    return (
        <IonRouterLink href={"/film/" + data.filmId} color="unset">
            <div className="FilmItem">
                <div className="FilmItemContainer">
                    <p>
                        <img src={data.posterUrlPreview} alt={data.nameRu} /><br />
                        <b>{data.nameRu}({data.nameEn})</b> <br />
                        Рейтинг: {data.rating} Длительность {data.filmLength} <br />
                        Год выхода: {data.year}
                    </p>
                </div>
            </div>
        </IonRouterLink>
    );
}

interface FilmItemProps {
    data: FilmData
}

export { FilmItem }