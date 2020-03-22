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
  useIonViewWillEnter,
  useIonViewDidLeave,
  IonToggle
} from '@ionic/react';
import './admin.css';
import AttendeesList from '../../components/attendeesList';
import AttendeesMap from '../../components/attendees-map/attendeesMap';
import { clear, getItems, getItem, setItem } from '../../util/storage';

const Admin: React.FC = () => {
  const [clearedList, setClearedList] = useState(false);
  const [activeSegment, setActiveSegment] = useState('list')
  const [attendees, setAttendees] = useState<any>([]);
  const [passwordInput, setPassword] = useState('');
  const [useQrScanner, setUseQrScanner] = useState(false)

  //get the data out of localstorage / sharedPreferences on page load
  useIonViewWillEnter(() => {
    const getData = async () => {
      setAttendees(await getItems('attend'));
      setUseQrScanner(await getItem('qr-scanner'));
    }
    getData();
  })

  //set the password saved from the input field to an empty string so the user needs to login again when navigating to this page
  // useIonViewDidLeave(() => {
  //   setPassword('')
  // })

  const PASSWORD = 'BlijfInUwKot'
  const isAuth = passwordInput !== PASSWORD;
  const emptyList = attendees.length === 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Admin</IonTitle>
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
          {!isAuth &&
            <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value!)}>
              <IonSegmentButton value="list">
                <IonLabel>List</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="map">
                <IonLabel>Map</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          }
        </IonToolbar>
      </IonHeader>
      {isAuth ?
        <IonContent>
          <IonCard style={{ padding: '1rem' }}>
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
          <IonItem color="light">
            <IonToggle checked={useQrScanner} onIonChange={async () => {
              await setItem('qr-scanner', JSON.stringify(!useQrScanner))
              setUseQrScanner(!useQrScanner)
            }} />
            <IonLabel style={{marginLeft: '1rem'}}>Use QR Scanner</IonLabel>
          </IonItem>
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
