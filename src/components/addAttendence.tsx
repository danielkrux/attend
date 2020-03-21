import { Plugins } from '@capacitor/core';
import React, { useState, useRef } from 'react';
import { IonButton, IonContent, IonLabel, IonInput, IonItem, IonList, IonLoading, IonIcon, IonModal } from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons';
import CanvasDraw from 'react-canvas-draw';

import { setItem } from "../util/storage";
import { getAdress } from '../util/httpClient';
import QRScannerModal from './attendees-map/qrScannerModal';

const { Geolocation } = Plugins;

export interface AddAttendenceProps { }

const AddAttendence: React.SFC<AddAttendenceProps> = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [qrModal, setQRModal] = useState(false)
  const [qrScanSucces, setQRScanSucess] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const canvas = useRef<any>(null);

  const getCurrentPosition = async () => {
    let result
    try {
      result = await Geolocation.getCurrentPosition();
    }
    catch (error) {
      console.log(error);
    }
    return result;
  }

  const submit = async () => {
    setIsLoading(true)
    let currentPositionResult = await getCurrentPosition();
    let adressApiResult = await getAdress(currentPositionResult?.coords.latitude, currentPositionResult?.coords.longitude)
    const id = `attend-${(Math.random() * 100).toFixed()}`;
    const canvasData = canvas.current.getSaveData();
    const dateTime = new Date().toISOString();
    const attendence = {
      firstname,
      lastname,
      signature: canvasData,
      submittedAt: dateTime,
      location: {
        lat: currentPositionResult?.coords.latitude,
        lon: currentPositionResult?.coords.longitude,
        adress: adressApiResult.results[0].formatted
      }
    }
    setFirstname('')
    setLastname('')
    canvas.current.clear();
    await setItem(id, attendence)
    setIsLoading(false)
  }

  const handleQRSucces = () => {
    setQRScanSucess(true)
    setQRModal(false)
  }

  return (
    <>
      <QRScannerModal handleDismiss={() => setQRModal(false)} isOpen={qrModal} handleSuccess={() => handleQRSucces()} />
      <IonLoading isOpen={isLoading} spinner="dots" />
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
                style={{ height: '250px', width: '400px' }}
                brushColor={"#000"}
                canvasHeight={250}
                canvasWidth={400}
                brushRadius={2}
                lazyRadius={0}
                ref={canvas}
                loadTimeOffset={10}
                saveData={''}
              />
            </IonItem>
          </IonList>
          {
            qrScanSucces ?
              <span style={{ color: 'green' }}>QR Code Scanned</span>
              :
              <IonButton size="small" color="light" onClick={() => { setQRModal(true) }}><IonIcon icon={qrCodeOutline} />&nbsp;Scan QR Code</IonButton>
          }
          <IonButton size="small" color="light" onClick={() => { canvas.current.clear() }}>Clear signture</IonButton>
          <div>
            <IonButton size="small" type='submit' disabled={!qrScanSucces}>Submit</IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
}

export default AddAttendence;
