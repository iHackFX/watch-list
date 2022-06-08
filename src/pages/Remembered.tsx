import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getListOfRememberedType } from "../storage/Remember";


enum categoriesByName {
    "watched" = 0,
    "watch" = 1,
    "need-to-watch" = 2
}

enum categoryRus {
    "watched" = "Просмотрено",
    "watch" = "Смотрю",
    "need-to-watch" = "Хочу посмотреть"
}

const WatchedPage: React.FC = () => {
    const [data,setData] = useState<JSX.Element[] | null>([]);
    
    async function getData(){
        var temp = await getListOfRememberedType("watched");
        if (temp !== null){
            setData(temp);
        }else{
            setData(null);
        }
    }

    useEffect(()=>{
        (async () => {
            var temp = await getListOfRememberedType("watched");
            if (temp !== null){
                setData(temp);
            }else{
                setData(null);
            }
        })();
    }, ["watched"])

    useIonViewWillEnter(async () => {
        getData();
    })
    useIonViewWillLeave(()=>{
        setData(null);
    })
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle size="large">{categoryRus["watched"]}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{categoryRus["watched"]}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    data !== null ? 
                    data.length != 0 ? (
                        <IonList>
                            {data}
                        </IonList>
                    ) : "" : ""
                }
            </IonContent>
        </IonPage>
    );
}

const WatchPage: React.FC = () => {
    const [data,setData] = useState<JSX.Element[] | null>([]);
    
    async function getData(){
        var temp = await getListOfRememberedType("watch");
        if (temp !== null){
            setData(temp);
        }else{
            setData(null);
        }
    }

    useEffect(()=>{
        (async () => {
            var temp = await getListOfRememberedType("watch");
            if (temp !== null){
                setData(temp);
            }else{
                setData(null);
            }
        })();
    }, ["watch"])

    useIonViewWillEnter(async () => {
        getData();
    })
    useIonViewWillLeave(()=>{
        setData(null);
    })
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle size="large">{categoryRus["watch"]}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{categoryRus["watch"]}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    data !== null ? 
                    data.length != 0 ? (
                        <IonList>
                            {data}
                        </IonList>
                    ) : "" : ""
                }
            </IonContent>
        </IonPage>
    );
}

const NeedToWatchPage: React.FC = () => {
    const [data,setData] = useState<JSX.Element[] | null>([]);
    
    async function getData(){
        var temp = await getListOfRememberedType("need-to-watch");
        if (temp !== null){
            setData(temp);
        }else{
            setData(null);
        }
    }

    useEffect(()=>{
        (async () => {
            var temp = await getListOfRememberedType("need-to-watch");
            if (temp !== null){
                setData(temp);
            }else{
                setData(null);
            }
        })();
    }, ["need-to-watch"])

    useIonViewWillEnter(async () => {
        getData();
    })
    useIonViewWillLeave(()=>{
        setData(null);
    })
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle size="large">{categoryRus["need-to-watch"]}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{categoryRus["need-to-watch"]}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    data !== null ? 
                    data.length != 0 ? (
                        <IonList>
                            {data}
                        </IonList>
                    ) : "" : ""
                }
            </IonContent>
        </IonPage>
    );
}

export {WatchPage, NeedToWatchPage, WatchedPage};