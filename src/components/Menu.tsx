import {
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, flameOutline, flameSharp, heartOutline, heartSharp, mailOutline, mailSharp, moon, moonOutline, moonSharp, paperPlaneOutline, paperPlaneSharp, playOutline, playSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon?: string;
  mdIcon?: string;
  iconSrc?: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Топ фильмы',
    url: '/Films',
    iconSrc: '/assets/svg/film.svg'
  },
  {
    title: 'Сериалы',
    url: '/Serials',
    iconSrc: '/assets/svg/serials.svg'
  },
  {
    title: 'Топ Аниме',
    url: '/Anime',
    iconSrc: '/assets/svg/anime.svg'
  },
];

const labels: AppPage[] = [
  {
    title: 'Просмотренное',
    url: '/Watched',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp
  },
  {
    title: 'Смотрю',
    url: '/WatchNow',
    iosIcon: playOutline,
    mdIcon: playSharp
  },
  {
    title: 'Хочу посмотреть',
    url: '/NeedToWatch',
    iosIcon: flameOutline,
    mdIcon: flameSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  // Query for the toggle that is used to change between themes
  const toggle = document.querySelector('#themeToggle') as HTMLInputElement;

  // Listen for the toggle check/uncheck to toggle the dark class on the <body>
  toggle?.addEventListener('ionChange', (ev) => {
    document.body.classList.toggle('dark');
  });

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((e) => checkToggle(e.matches));

  // Called when the app loads
  function loadApp() {
    checkToggle(prefersDark.matches);
  }

  // Called by the media query to check/uncheck the toggle
  function checkToggle(shouldCheck: boolean) {
    toggle.checked = shouldCheck;
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>WatchList</IonListHeader>
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
          <IonListHeader>Labels</IonListHeader>
          {labels.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} src={appPage.iconSrc} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonIcon ios={moonOutline} md={moonSharp} slot="start" />
            <IonLabel>Темная тема</IonLabel>
            <IonToggle onIonChange={(ev)=>{document.documentElement.classList.toggle('md')}} checked={ document.documentElement.classList.contains('md') } />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
