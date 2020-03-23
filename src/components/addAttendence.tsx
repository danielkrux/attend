import { Plugins } from '@capacitor/core';
import React, { useState, useRef } from 'react';
import { IonButton, IonContent, IonLabel, IonInput, IonItem, IonList, IonLoading, IonIcon, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons';
import CanvasDraw from 'react-canvas-draw';

import { setItem, getItem } from "../util/storage";
import { getAdress } from '../util/httpClient';
import QRScannerModal from './qrScannerModal';

const { Geolocation } = Plugins;

export interface AddAttendenceProps { }

const AddAttendence: React.SFC<AddAttendenceProps> = () => {
  //set state for various variables we need
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [useQrScanner, setUseQrScanner] = useState(undefined)
  const [qrModal, setQRModal] = useState(false)
  const [qrScanSucces, setQRScanSucess] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [signatureKey, setSignatureKey] = useState(0)

  //get the reference to the canvasdraw component to clear or save the signature
  const canvas = useRef<any>(null);

  useIonViewWillEnter(async () => {
    setUseQrScanner(await getItem('qr-scanner'));
  })

  useIonViewDidLeave(() => {
    //For some reason, the 'canvasdraw' will be unuseable without refreshing it's key to something random on leaving the page
    setSignatureKey(Math.random());
  })

  //Get the current position of the user on submitting the form
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
    let currentPositionResult;
    let adressApiResult;
    //show the loading indicator
    setIsLoading(true)
    if(!useQrScanner) {
      currentPositionResult = await getCurrentPosition();
      //call the adress api with the received coordinates
      adressApiResult = await getAdress(currentPositionResult?.coords.latitude, currentPositionResult?.coords.longitude)
    }
    //get a random ID
    const id = `attend-${(Math.random() * 100).toFixed()}`;
    //get the signature from the canvasdraw component using the 'useRef' hook in line 26
    const canvasData = canvas.current.getSaveData();
    //save the date and time
    const dateTime = new Date().toISOString();
    const attendence = {
      firstname,
      lastname,
      signature: canvasData,
      submittedAt: dateTime,
      location: {
        lat: currentPositionResult?.coords.latitude,
        lon: currentPositionResult?.coords.longitude,
        adress: adressApiResult?.results[0]?.formatted
      },
      scannedQRCode: qrScanSucces
    }
    //reset the form
    setQRScanSucess(false)
    setFirstname('')
    setLastname('')
    canvas.current.clear();
    //save the item to localstorage / sharedPreferences
    await setItem(id, attendence)
    setIsLoading(false)
  }

  //handle the success callback of the qrReader component by setting the qrScanSucess to true and closing the modal
  const handleQRSucces = () => {
    setQRScanSucess(true)
    setQRModal(false)
  }

  //checks to prevent the user from submitting if form is invalid
  const formInvalid = () => {
    if (useQrScanner) {
      return (!qrScanSucces || firstname.length === 0 || lastname.length === 0)
    }
    else {
      return (firstname.length === 0 || lastname.length === 0)
    }
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
                key={signatureKey}
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
            useQrScanner && (
              qrScanSucces ?
                <span style={{ color: 'green', marginLeft: '1rem' }}>QR Code Scanned</span>
                :
                <IonButton size="small" color="light" onClick={() => { setQRModal(true) }}>
                  <IonIcon icon={qrCodeOutline} />
                  &nbsp;Scan QR Code
                </IonButton>
            )
          }
          <IonButton size="small" color="light" onClick={() => { canvas.current.clear() }}>Clear signature</IonButton>
          <div>
            {/* disable the submit button aslong as the user has not succesfully filled out the form */}
            <IonButton size="small" type='submit' disabled={formInvalid()}>Submit</IonButton>
          </div>
        </form>
      </IonContent>
    </>
  );
}

export default AddAttendence;