import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { person, lockClosed } from 'ionicons/icons';
import Attendees from './pages/Attendees/attendees';
import Admin from './pages/Admin/admin';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet >
          <Route path="/attendees" component={Attendees} exact={true} />
          <Route path="/admin" component={Admin} exact={true} />
          <Route path="/" render={() => <Redirect to="attendees" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="attendees" href="/attendees">
            <IonIcon icon={person} />
            <IonLabel>Attendees</IonLabel>
          </IonTabButton>
          <IonTabButton tab="admin" href="/admin">
            <IonIcon icon={lockClosed} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
