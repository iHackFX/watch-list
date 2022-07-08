import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { albumsOutline, albumsSharp, archiveOutline, archiveSharp, flameOutline, flameSharp, moonOutline, moonSharp, playOutline, playSharp } from 'ionicons/icons';
import './Menu.css';
import { toggleTheme } from './settings';
import { useEffect, useState } from 'react';
import { getTheme } from '../storage/settings';

type AppPage = {
  url: string;
  iosIcon?: string;
  mdIcon?: string;
  iconSrc?: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Топ фильмов',
    url: '/Films',
    iconSrc: '/assets/svg/film.svg'
  },
  {
    title: 'Топ Сериалов',
    url: '/Serials',
    iconSrc: '/assets/svg/serials.svg'
  },
  {
    title: 'Топ Аниме',
    url: '/Anime',
    iconSrc: '/assets/svg/anime.svg'
  },
];

const savedTypesMenu: AppPage[] = [
  {
    title: 'Просмотренное',
    url: '/watched',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Смотрю',
    url: '/watch',
    iosIcon: playOutline,
    mdIcon: playSharp
  },
  {
    title: 'Хочу посмотреть',
    url: '/need-to-watch',
    iosIcon: flameOutline,
    mdIcon: flameSharp
  },
  {
    title: 'В кэше',
    url: '/Cached',
    iosIcon: albumsOutline,
    mdIcon: albumsSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Категории</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} src={appPage.iconSrc} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Сохраненные</IonListHeader>
          {savedTypesMenu.map((savedType, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === savedType.url ? 'selected' : ''} routerLink={savedType.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={savedType.iosIcon} md={savedType.mdIcon} src={savedType.iconSrc} />
                  <IonLabel>{savedType.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        
        <IonList id="labels-list">
          <IonListHeader>Быстрые настройки</IonListHeader>
          <IonItem onClick={()=>{ toggleTheme(); }}>
            <IonIcon ios={moonOutline} md={moonSharp} slot="start" />
            <IonLabel>Сменить тему</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
export { savedTypesMenu };