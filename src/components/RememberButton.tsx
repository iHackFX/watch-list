import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, trashBin } from 'ionicons/icons';
import { FilmData } from '../apis/Kinopoisk';
import { Anime } from '../apis/Shikimori';
import { deleteFromStorage, save, typeOfCategories } from '../storage/Remember';
import { savedTypesMenu } from './Menu';

interface _ButtonNeeds {
    savedTypeInStorage?: typeOfCategories,
    data: FilmData | Anime,
    setSavedType: React.Dispatch<React.SetStateAction<typeOfCategories | undefined>>
}

const RememberButton: React.FC<_ButtonNeeds> = ({ data, savedTypeInStorage, setSavedType }) => {

    async function saveToStorage(type: typeOfCategories) {
        await save(type, data);
        setSavedType(type);
    }

    function getFab() {
        if (savedTypeInStorage === undefined) {
            return (
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton>
                        <IonIcon icon={add} />
                    </IonFabButton>
                    <IonFabList side='top'>
                        {
                            savedTypesMenu.map((savedType, idx, arr) => {
                                if (idx === arr.length - 1) return;
                                return (
                                    <IonFabButton title={savedType.title} key={idx} onClick={() => { saveToStorage(idx as typeOfCategories); }}>
                                        <IonIcon ios={savedType.iosIcon} md={savedType.mdIcon} src={savedType.iconSrc} title={savedType.title} />
                                    </IonFabButton>
                                );
                            })
                        }
                    </IonFabList>
                </IonFab>
            )
        } else {
            return (
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={()=>{ deleteFromStorage(data); setSavedType(undefined); }}>
                        <IonIcon icon={trashBin} />
                    </IonFabButton>
                </IonFab>
            )
        }
    }

    return (getFab());
}

export default RememberButton;