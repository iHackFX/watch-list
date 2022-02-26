import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FilmData, search } from '../apis/Kinopoisk';
import { AnimeItem, FilmItem } from '../components/List';
import { Animes, searchAnimes } from './../apis/Shikimori';
import './Page.css';

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [filmSearchResult, setFilmSearchResult] = useState<FilmData[] | null>(null);
  const [animeSearchResult, setAnimeSearchResult] = useState<Animes[] | null>(null);
  const { query } = useParams<{ query: string; }>();
  const router = useIonRouter();

  useEffect(() => {
    if (searchString.length > 3){
      (async ()=>{
        var animeRes = await searchAnimes(searchString);
        var filmRes = await search(searchString);
        setFilmSearchResult(filmRes || null);
        setAnimeSearchResult(animeRes || null);
      })();
    }
  }, [searchString, query])
  
  function searchData(query:string = searchString) {
    (async ()=>{
      var animeRes = await searchAnimes(query);
      var filmRes = await search(query);
      setFilmSearchResult(filmRes || null);
      setAnimeSearchResult(animeRes || null);
      router.push("?q=" + searchString);
    })();
  }

  useIonViewDidLeave(() => {
    setSearchString("");
    setFilmSearchResult(null);
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div slot='start'>
            <IonBackButton />
          </div>
          <IonInput onIonChange={(event) => {
            var q = event.detail.value?.toString()
            setSearchString(q || "");
          }} value={searchString.length === 0 ? new URLSearchParams(window.location.search).get("q") || query || "" : searchString} type='text' placeholder="Введите название фильма или сериала" />
          <IonButton slot='end' fill='clear' onClick={()=>{ searchData(new URLSearchParams(window.location.search).get("q") || query || "") }}>
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
          {
            filmSearchResult ? filmSearchResult.map((film, idx)=>{
              return (
                <FilmItem key={idx} data={film} />
              );
            }) : <IonItem>Из фильмов ничего не найдено</IonItem>
          }
          {
            animeSearchResult ? animeSearchResult.map((anime, idx)=>{
              return (
                <AnimeItem key={idx} data={anime} />
              );
            }) : <IonItem>Из аниме ничего не найдено</IonItem>
          }
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default SearchPage;