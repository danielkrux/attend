import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import './map.css';
import AttendeesMap from '../../components/attendeesMap';
import { getItems } from '../../util/storage';

const Map: React.FC = () => {
  const [attendees, setAttendees] = useState<any>([]);

  useEffect(() => {
    const getAttendees = async () => {
      setAttendees(await getItems('attend'));
    }
    getAttendees();
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={!(attendees && attendees.length > 0)} />
        {(attendees && attendees.length > 0) && <AttendeesMap attendees={attendees} />}
      </IonContent>
    </IonPage>
  );
};

export default Map;
