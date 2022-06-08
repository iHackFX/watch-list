import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { GetFilmData, getDataToFilmData } from '../apis/Kinopoisk';
import { Anime, GetAnimeData } from '../apis/Shikimori';
import { AnimeItem, FilmItem } from '../components/List';
import { getCachedAnimes, getCachedFilms } from '../storage/Cache';
import './Page.css';

const Saved: React.FC = () => {
    const [films, setFilms] = useState<GetFilmData[] | undefined>();
    const [animes, setAnimes] = useState<GetAnimeData[] | undefined>();
    const [items, setItems] = useState<JSX.Element[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();

    const pushData = (data: GetFilmData[] | GetAnimeData[]) => {
        const max = items.length + 5;
        const min = max - 5;
        const newData = [];
        for (let i = min; i < max; i++) {
            let dataD = data[i];
            if ("kinopoiskId" in dataD){
                let film = getDataToFilmData(dataD);
                if (film === null) continue;
                newData.push(<FilmItem key={i} data={film} />);
            }else{
                let anime = dataD;
                newData.push(<AnimeItem key={i} data={anime as Anime} />);
            }
        }
        setItems([
            ...items,
            ...newData
        ]);
    }
    const loadData = (ev: any, InputFilms?: any[]) => {
        setTimeout(() => {
            if (items.length == InputFilms?.length || items.length == films?.length) {
                setInfiniteDisabled(true); return;
            }
            pushData(InputFilms || films || animes || []);
            if (ev != undefined) ev.target.complete();
        }, 500);
    }

    useIonViewWillEnter(async () => {
        let films = await getCachedFilms();
        let animes = await getCachedAnimes();
        if (films.length === 0) return;
        setFilms(films);
        setAnimes(animes);
        let data = new Array();
        data.concat(films);
        data.concat(animes);
        loadData(null, data);
    });

    useIonViewWillLeave(async()=>{
        setFilms([]);
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Кэшированное</IonTitle>
                    <IonButton onClick={() => {
                        router.push("/Search");
                    }} slot='end' fill='clear'>
                        <IonIcon icon={searchOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Топ фильмы</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {items ?
                        items
                        :
                        <IonItem>
                            <p>Ничего не загружено</p>
                        </IonItem>
                    }
                    <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
                        <IonInfiniteScrollContent
                            loadingSpinner="bubbles"
                            loadingText="Загружаются данные">
                        </IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                </IonList>
            </IonContent>
        </IonPage >
    );
};

export default Saved;
