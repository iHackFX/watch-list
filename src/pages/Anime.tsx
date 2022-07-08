import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonList, IonMenuButton, IonPage, IonSpinner, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave, IonFab, IonFabButton, IonFabList, IonIcon, IonText, useIonRouter, useIonViewDidLeave } from '@ionic/react';
import { play } from 'ionicons/icons/index';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Browser } from '@capacitor/browser';
import './Film.css';
import RememberButton from '../components/RememberButton';
import { getTypeOfSavedItem, typeOfCategories } from '../storage/Remember';
import { getAnime, GetAnimeData, getDataToAnimeData } from '../apis/Shikimori';

const AnimePage: React.FC = () => {
    const { animeId } = useParams<{ animeId: string; }>();
    const [data, setData] = useState<GetAnimeData | null>(null);
    const [typeInSaved, setSavedType] = useState<typeOfCategories | undefined>(undefined);
    async function open(url: string) {
        // await Browser.open({ url: url.replace(/ru/g, "GG") });
        await Browser.open({url: "https://shikimori.one/" + url})
    }
    useIonViewDidEnter(() => {
        (async () => {
            var data = await getAnime(Number.parseInt(animeId) || 0);
            setData(data || null);
            var savedType : typeOfCategories | undefined = data ? await getTypeOfSavedItem(getDataToAnimeData(data)) : undefined;
            console.log(savedType);
            setSavedType(savedType != undefined ? savedType as typeOfCategories : undefined);
        })();
    });

    useIonViewDidLeave(() => {
        setData(null);
    });
    
    useIonViewWillLeave(() => {
        setData(null);
    })

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
                                <span><img src={"https://shikimori.one/" + data?.image.original} /></span>
                            </div>
                            <div className='FilmPageList'>
                                <div className='FilmPageItem'>
                                    <IonTitle>{data?.russian || data?.name}</IonTitle>
                                    <IonTitle>{data?.japanese || ""}</IonTitle>
                                    <IonText>
                                        {
                                            "Жанр: " + data.genres.map((data) => {
                                                return (data.russian || data.name || "")
                                            })
                                        }
                                    </IonText>


                                    <IonText>{data.description?.replace(/ *\[[^\]]*]/, '')}</IonText>


                                    <IonText>
                                        Дата выхода: {data.aired_on}
                                    </IonText>
{/* 
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
                                    } */}
                                </div>
                            </div>
                        </div>
                }
            </IonContent>
            {
                data !== null ? typeInSaved !== null ? 
                <RememberButton setSavedType={setSavedType} savedTypeInStorage={typeInSaved} data={getDataToAnimeData(data)} /> 
                : "" : ""
            }
            {
                data !== null ?
                    <IonFab vertical="bottom" horizontal="start" slot="fixed" onClick={() => { open(data.url) }}>
                        <IonFabButton>
                            <IonIcon icon={play} />
                        </IonFabButton>
                    </IonFab> : ""
            }
        </IonPage>
    );
};

export default AnimePage;
export { AnimePage };