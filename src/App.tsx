import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/App.css';
import TopFilms from './pages/TopFilms';
import SearchPage from './pages/SearchPage';
import AnimeTop from './pages/AnimeTop';
import TopSerials from './pages/TopSerials';
import FilmPage from './pages/Film';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Films" />
            </Route>
            <Route path="/Search" exact={true}>
              <SearchPage />
            </Route>
            <Route path="/Search/?q=:query" exact={true}>
              <SearchPage />
            </Route>
            <Route path="/Anime" exact={true}>
              <AnimeTop />
            </Route>
            <Route path="/Films" exact={true}>
              <TopFilms />
            </Route>
            <Route path="/Serials" exact={true}>
              <TopSerials />
            </Route>
            <Route path="/film/:filmId" exact={true}>
              <FilmPage />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
