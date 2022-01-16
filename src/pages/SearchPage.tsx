import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { searchAnimes } from './../apis/Shikimori';
import './Page.css';

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = useState<string>("");

  useEffect(()=>{
    searchAnimes(searchString);
  }, [searchString])

  useIonViewWillEnter(()=>{
    
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonInput onIonChange={(event) => {
            setSearchString(event.detail.value?.toString() || "");
          }} type='text' placeholder="Введите название фильма или сериала" />
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
            
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default SearchPage;