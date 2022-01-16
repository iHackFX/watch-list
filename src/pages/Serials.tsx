import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import { FilmItem } from '../components/List';
import { FilmData, getTopFilms } from "./../apis/Kinopoisk";
import './Page.css';

const Serials: React.FC = () => {
  const [films, setFilms] = useState<FilmData[] | undefined>();
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const pushData = (films: FilmData[]) => {
    const max = items.length + 5;
    const min = max - 5;
    const newData = [];
    for (let i = min; i < max; i++) {
      newData.push(<FilmItem key={i} data={films[i]} />);
    }
    console.log(films)
    setItems([
      ...items,
      ...newData
    ]);
  }
  const loadData = (ev: any, InputFilms?: FilmData[]) => {
    setTimeout(() => {
      if (items.length == InputFilms?.length || items.length == films?.length) {
        setInfiniteDisabled(true); return;
      }
      pushData(InputFilms || films || []);
      if (ev != undefined) ev.target.complete();
    }, 500);
  }

  useIonViewWillEnter(async () => {
    let films = await getTopFilms();
    setFilms(films);
    loadData(null, films);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Топ фильмов</IonTitle>
          <IonButton slot='end' fill='clear'>
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

export default Serials;
