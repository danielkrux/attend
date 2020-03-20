import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './attendees.css';
import AddAttendence from '../../components/addAttendence';

const Attendees: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle size="large">Add Attendence</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddAttendence/>
      </IonContent>
    </IonPage>
  );
};

export default Attendees;
