import { Plugins } from '@capacitor/core';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { FilmItem } from '../components/List';
import { getTopSerials, FilmData } from "./../apis/Kinopoisk";
import './Page.css';

const { App } = Plugins;
const TopSerials: React.FC = () => {
    const [serial, setSerials] = useState<FilmData[] | undefined>();
    const [items, setItems] = useState<JSX.Element[]>([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const router = useIonRouter();

    const pushData = async (serials: FilmData[]) => {
        const max = items.length + 20;
        const min = max - 20;
        const newData = [];
        var dataGet = await getTopSerials((min / 20) + 1);
        if (dataGet == null) return;
        var serialsNew = [...serials, ...dataGet];
        for (let i = min; i < max; i++) {
            newData.push(<FilmItem key={i} data={serialsNew[i]} />);
        }
        setItems([
            ...items,
            ...newData
        ]);
        if (serial != undefined) {
            setSerials([
                ...serial,
                ...dataGet
            ]);
        }
    }
    const loadData = (ev: any, InputSerials?: FilmData[]) => {
        setTimeout(async () => {
            await pushData(InputSerials || serial || []);
            if (ev != undefined) ev.target.complete();
        }, 500);
    }

    useIonViewWillEnter(async () => {
        let serials = await getTopSerials(1);
        setSerials(serials || undefined);
        loadData(null, (serials || undefined));
    });

    // Exit app
    const ionRouter = useIonRouter();
    document.addEventListener('ionBackButton', (ev) => {
        if (!ionRouter.canGoBack()) {
          App.exitApp();
        }
    });

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Топ Сериалов</IonTitle>
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
                        <IonTitle size="large">Топ Сериалов</IonTitle>
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

export default TopSerials;