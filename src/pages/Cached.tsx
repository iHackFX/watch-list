import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { FilmData, GetFilmData, getDataToFilmData } from '../apis/Kinopoisk';
import { FilmItem } from '../components/List';
import { getCachedFilm, getCachedFilms } from '../storage/Cache';
import './Page.css';

const Cached: React.FC = () => {
    const [films, setFilms] = useState<GetFilmData[] | undefined>();
    const [items, setItems] = useState<JSX.Element[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();

    const pushData = (films: GetFilmData[]) => {
        const max = items.length + 5;
        const min = max - 5;
        const newData = [];
        for (let i = min; i < max; i++) {
            let film = getDataToFilmData(films[i]);
            if (film === null) continue;
            newData.push(<FilmItem key={i} data={film} />);
        }
        setItems([
            ...items,
            ...newData
        ]);
    }
    const loadData = (ev: any, InputFilms?: GetFilmData[]) => {
        setTimeout(() => {
            if (items.length == InputFilms?.length || items.length == films?.length) {
                setInfiniteDisabled(true); return;
            }
            pushData(InputFilms || films || []);
            if (ev != undefined) ev.target.complete();
        }, 500);
    }

    useIonViewWillEnter(async () => {
        let films = await getCachedFilms();
        setFilms(films);
        loadData(null, films);
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

export default Cached;
