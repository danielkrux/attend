import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import './admin.css';
import AttendeesList from '../../components/attendeesList';
import { clear } from '../../util/storage';

const Admin: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [clearedList, setClearedList] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { clear(); setClearedList(true) }}>Clear</IonButton>
            <IonButton onClick={() => setIsAdding(true)}>Add</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ display: 'flex', margin: '1rem auto' }}>
          <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
            <IonSegmentButton value="List">
              <IonLabel>List</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Map">
              <IonLabel>Map</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        <AttendeesList isAdding={isAdding} clearedList={clearedList} />
      </IonContent>
    </IonPage>
  );
};

export default Admin;
