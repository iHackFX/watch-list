import { IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


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

const Remembered: React.FC = () => {
    const { category } = useParams<{ category: "watched" | "watch" | "need-to-watch" }>();
    const [data,setData] = useState<React.FC[]>([]);
    useEffect(()=>{
        (async ()=>{
            // let getData = await ;
        })()
    }, [])
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle size="large">{categoryRus[category]}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{categoryRus[category]}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    data.length != 0 ? (
                        <IonList>
                            {data}
                        </IonList>
                    ) : ""
                }
            </IonContent>
        </IonPage>
    );
}

export default Remembered;