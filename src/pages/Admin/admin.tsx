import React, { useState, useEffect } from 'react';
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
  IonModal, 
  IonItem, 
  IonInput
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

  useEffect(() => {
    const getAttendees = async () => {
      setAttendees(await getItems('attend'));
    }
    getAttendees();
  }, [clearedList])

  return (
    <IonPage>
      <IonModal animated={false} isOpen={passwordInput !== PASSWORD}>
        <IonContent className='auth-modal'>
          <h3>Login</h3>
          <p>Enter password to proceed</p>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" value={passwordInput} onInput={(e: any) => setPassword((e.target.value))} />
          </IonItem>
        </IonContent>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { clear(); setClearedList(true) }}>Clear</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={activeSegment} onIonChange={e => setActiveSegment(e.detail.value!)}>
            <IonSegmentButton value="list">
              <IonLabel>List</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="map">
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {activeSegment === 'list' ?
          <AttendeesList attendees={attendees} />
          :
          (attendees && attendees.length > 0) && <AttendeesMap attendees={attendees} />
        }
      </IonContent>
    </IonPage>
  );
};

export default Admin;
