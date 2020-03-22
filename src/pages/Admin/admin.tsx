import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonInput,
  IonCard,
  useIonViewWillEnter
} from '@ionic/react';
import './admin.css';
import AttendeesList from '../../components/attendeesList';
import AttendeesMap from '../../components/attendees-map/attendeesMap';
import { clear, getItems } from '../../util/storage';

const Admin: React.FC = () => {
  const [clearedList, setClearedList] = useState(false);
  const [activeSegment, setActiveSegment] = useState('list')
  const [attendees, setAttendees] = useState<any>([]);
  const [passwordInput, setPassword] = useState('');

  const PASSWORD = 'test'

  useIonViewWillEnter(() => {
    const getAttendees = async () => {
      setAttendees(await getItems('attend'));
    }
    getAttendees();
  })

  const isAuth = passwordInput !== PASSWORD;
  const emptyList = attendees.length === 0;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
          {!isAuth && <IonButtons slot="end">
            <IonButton
              onClick={async () => {
                await clear();
                setAttendees([]);
                setClearedList(true)
              }}
              disabled={emptyList}
            >Clear</IonButton>
          </IonButtons>}
        </IonToolbar>
        <IonToolbar>
          {!isAuth && <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value!)}>
            <IonSegmentButton value="list">
              <IonLabel>List</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="map">
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
          </IonSegment>}
        </IonToolbar>
      </IonHeader>
      {isAuth ?
        < IonContent>
          < IonCard style={{ padding: '1rem' }}>
            <h3>Login</h3>
            <p>Enter password to proceed</p>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput type="password" value={passwordInput} onInput={(e: any) => setPassword((e.target.value))} />
            </IonItem>
          </IonCard>
        </IonContent>
        :
        <IonContent>
          {activeSegment === 'list' ?
            <AttendeesList attendees={attendees} />
            :
            (attendees && attendees.length > 0) && <AttendeesMap attendees={attendees} />
          }
        </IonContent>

      }
    </IonPage >
  );
};

export default Admin;
