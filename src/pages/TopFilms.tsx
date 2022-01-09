import { IonButtons, IonContent, IonHeader, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { FilmItem } from '../components/List';
import { FilmData, getTopFilms } from "./../apis/Kinopoisk";
import './Page.css';

const TopFilms: React.FC = () => {
  const [films, setFilms] = useState<FilmData[] | undefined>();
  useEffect(() => {
    async function a() {
      console.log(await getTopFilms());
      setFilms(await getTopFilms());
    }
    a();
  }, [true])
  useEffect(() => {
    console.log(films)
  }, [films])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Топ фильмов</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Топ фильмы</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {films ? films.map((val, idx, arr) => {
            return (
              <FilmItem key={idx} data={val} /> 
              // <IonItem key={idx}>
              //   <p>{val.nameRu}</p>
              // </IonItem>
            );
          }) : <IonItem>Ничего не подгрузилось</IonItem>}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TopFilms;
