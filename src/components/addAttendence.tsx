import React, { useState, useRef } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonLabel, IonInput, IonItem, IonList } from '@ionic/react';
// eslint-disable-next-line
import { setItem, clear } from "../util/storage";
import CanvasDraw from 'react-canvas-draw';

export interface AddAttendenceProps {
  handleModalClose: () => void;
}

const AddAttendence: React.SFC<AddAttendenceProps> = ({ handleModalClose }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const canvas = useRef<any>(null);

  const submit = async () => {
    const id = `attend-${(Math.random() * 100).toFixed()}`;
    const canvasData = canvas.current.getSaveData();
    const dateTime = new Date().toISOString();
    const attendence = {
      firstname,
      lastname,
      signature: canvasData,
      submittedAt: dateTime,
    }
    setItem(id, attendence)
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Add attendence</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => handleModalClose()}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={e => {
          e.preventDefault();
          submit();
        }}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Firstname</IonLabel>
              <IonInput value={firstname} onInput={(e: any) => setFirstname((e.target.value))} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Lastname</IonLabel>
              <IonInput value={lastname} onInput={(e: any) => setLastname((e.target.value))} />
            </IonItem>
            <IonItem>
              <CanvasDraw
                brushColor={"#000"}
                canvasHeight={250}
                canvasWidth={400}
                brushRadius={2}
                lazyRadius={0}
                ref={canvas}
              />
            </IonItem>
          </IonList>
          <IonButton type='submit'>Submit</IonButton>
        </form>
      </IonContent>
    </>
  );
}

export default AddAttendence;