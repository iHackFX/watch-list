import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonList, IonMenuButton, IonPage, IonSpinner, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave, IonFab, IonFabButton, IonFabList, IonIcon, IonText, useIonRouter, useIonViewDidLeave } from '@ionic/react';
import { play } from 'ionicons/icons/index';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Browser } from '@capacitor/browser';
import { getDataToFilmData, getFilm, GetFilmData, getTrailer, GetTrailerData } from '../apis/Kinopoisk';
import './Film.css';
import RememberButton from '../components/RememberButton';
import { getTypeOfSavedItem, typeOfCategories } from '../storage/Remember';

const FilmPage: React.FC = () => {
    const { filmId } = useParams<{ filmId: string; }>();
    const [data, setData] = useState<GetFilmData | null>(null);
    const [trailerData, setTrailerData] = useState<GetTrailerData[] | null>(null);
    const [typeInSaved, setSavedType] = useState<typeOfCategories | undefined>(undefined);
    async function open(url: string) {
        await Browser.open({ url: url.replace(/ru/g, "GG") });
    }
    useIonViewDidEnter(() => {
        (async () => {
            var data = await getFilm(Number.parseInt(filmId) || 0);
            setData(data || null);
            var trailer = await getTrailer(Number.parseInt(filmId) || 0);
            setTrailerData(trailer || null);
            var savedType : typeOfCategories | undefined = data ? await getTypeOfSavedItem(getDataToFilmData(data)) : undefined;
            console.log(savedType);
            setSavedType(savedType != undefined ? savedType as typeOfCategories : undefined);
        })();
    });

    useIonViewDidLeave(() => {
        setData(null);
        setTrailerData(null);
    });

    function getIdYoutube(url: string) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }

    return (
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    data === null ?
                        <IonList style={{ height: "100%" }} lines="none">
                            <IonItem style={{ height: "100%" }}>
                                <IonSpinner name="crescent" style={{
                                    margin: "auto",
                                    marginTop: "50%",
                                    height: 100,
                                    width: 100
                                }} />
                            </IonItem>
                        </IonList>
                        :
                        <div>
                            <div className='FilmPageImg'>
                                <span><img src={data?.posterUrl} /></span>
                            </div>
                            <div className='FilmPageList'>
                                <div className='FilmPageItem'>
                                    <IonTitle>{data?.nameRu || data?.nameEn || data.nameOriginal}</IonTitle>

                                    <IonText>
                                        {
                                            "????????????: " + data.countries.map((data) => {
                                                return (data.country)
                                            })
                                        }
                                    </IonText>

                                    <IonText>
                                        {
                                            "????????: " + data.genres.map((data) => {
                                                return (data.genre)
                                            })
                                        }
                                    </IonText>


                                    <IonText>{data.description}</IonText>
                                    <IonText>{data.shortDescription}</IonText>


                                    <IonText>
                                        ???????? ????????????: {data.type == "TV_SHOW" ? data.startYear + " - " + data.endYear : data.year}
                                    </IonText>

                                    {
                                        trailerData ? 
                                            trailerData.map((val, idx) => {
                                                if (val.site == "YOUTUBE") {
                                                    if (idx > 10) return;
                                                    return (<div key={idx}>
                                                        <IonText>{val.name}</IonText><br />
                                                        <iframe className='FilmPageTrailer' height="320" src={
                                                            "http://www.youtube.com/embed/" + getIdYoutube(val.url)
                                                        } frameBorder="0"
                                                            allowFullScreen={true} id="movie-trailer" /><br />
                                                    </div>);
                                                }
                                            })
                                            : ""
                                    }
                                </div>
                            </div>
                        </div>
                }
            </IonContent>
            {
                data !== null ? typeInSaved !== null ? 
                <RememberButton setSavedType={setSavedType} savedTypeInStorage={typeInSaved} data={getDataToFilmData(data)} /> 
                : "" : ""
            }
            {
                data !== null ?
                    <IonFab vertical="bottom" horizontal="start" slot="fixed" onClick={() => { open(data.webUrl) }}>
                        <IonFabButton>
                            <IonIcon icon={play} />
                        </IonFabButton>
                    </IonFab> : ""
            }
        </IonPage>
    );
};

export default FilmPage;