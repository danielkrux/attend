import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonModal, IonList, IonItem, IonLabel } from '@ionic/react';
import './attendees.css';
import AddAttendence from '../../components/addAttendence';
import { getItems, clear } from '../../util/storage'
import CanvasDraw from 'react-canvas-draw';

const Attendees: React.FC = () => {
  const name = 'Attendees'
  const [isAdding, setIsAdding] = useState(false);
  const [attendees, setAttendees] = useState<any>([]);

  const canvas = useRef<any>(null);

  useEffect(() => {
    const getAttendees = async () => {
      setAttendees(await getItems('attend'));
    }
    getAttendees();
  }, [isAdding])

  return (
    <IonPage>
      <IonContent>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => clear()}>Clear</IonButton>
              <IonButton onClick={() => setIsAdding(true)}>Add</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {attendees.map((a: any, i: number) => {
              const submittedAt = new Date(a.submittedAt);
              const DATE = submittedAt.toLocaleDateString();
              const TIME = submittedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <IonItem className='attendence-row' key={i}>
                  <IonLabel>
                    <h2>{a.firstname}&nbsp;{a.lastname}</h2>
                    <p>{DATE} {TIME}</p>
                  </IonLabel>
                  <CanvasDraw style={{ marginBottom: '.5rem' }} disabled canvasHeight={100} canvasWidth={100} saveData={a.signature} />
                </IonItem>
              )
            })}
          </IonList>
        </IonContent>
        <IonModal isOpen={isAdding}>
          <AddAttendence handleModalClose={() => setIsAdding(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Attendees;
