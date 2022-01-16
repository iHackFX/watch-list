import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { AnimeItem } from '../components/List';
import { getTopAnimes, Animes } from "./../apis/Shikimori";
import './Page.css';

const AnimeTop: React.FC = () => {
    const [anime, setAnime] = useState<Animes[] | undefined>();
    const [items, setItems] = useState<JSX.Element[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();

    const pushData = async (animes: Animes[]) => {
        const max = items.length + 5;
        const min = max - 5;
        const newData = [];
        var dataGet = await getTopAnimes((min / 5) + 1);
        var animesNew = [...animes, ...dataGet];
        for (let i = min; i < max; i++) {
            newData.push(<AnimeItem key={i} data={animesNew[i]} />);
        }
        setItems([
            ...items,
            ...newData
        ]);
        if (anime != undefined){
            setAnime([
                ...anime,
                ...dataGet
            ]);
        }
    }
    const loadData = (ev: any, InputAnimes?: Animes[]) => {
        setTimeout(async () => {
            await pushData(InputAnimes || anime || []);
            if (ev != undefined) ev.target.complete();
        }, 500);
    }

    useIonViewWillEnter(async () => {
        let animes = await getTopAnimes(1);
        setAnime(animes);
        loadData(null, animes);
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Топ Аниме</IonTitle>
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
                        <IonTitle size="large">Топ Аниме</IonTitle>
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

export default AnimeTop;