import { IonModal, isPlatform, useIonViewDidLeave, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonButton, IonIcon, IonTitle } from "@ionic/react";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { chevronBack } from "ionicons/icons";

declare let window: any;

export interface QRScannerModalProps {
  isOpen: boolean
  handleDismiss: () => void;
  handleSuccess: () => void;
}

const QRScannerModal: React.SFC<QRScannerModalProps> = ({ isOpen, handleDismiss, handleSuccess }) => {
  const PASSPHRASE = 'Presence detected!'
  const [scanSuccess, setScanSuccess] = useState(false);

  useEffect(() => {
    if (isPlatform('capacitor') && isOpen && !scanSuccess) {
      window.cordova.plugins.barcodeScanner.scan(
        (result: any) => {
          if (result.text === PASSPHRASE) {
            setScanSuccess(true);
            handleSuccess();
          }
        },
        (err: any) => { handleDismiss() },
        {
          prompt: "Scan your code",
          formats: "QR_CODE",
          resultDisplayDuration: 0
        }
      );
    }
  })

  useIonViewDidLeave(() => {
    setScanSuccess(false)
  })

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss} swipeToClose>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => handleDismiss()}><IonIcon icon={chevronBack} />&nbsp;Back</IonButton>
          </IonButtons>
          <IonTitle>Scan QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isPlatform("capacitor") ?
          <></>
          :
          <QrReader
            facingMode={"environment"}
            onScan={(data) => {
              if (data === PASSPHRASE) {
                setScanSuccess(true)
                handleSuccess()
              }
            }}
            onError={(e: any) => console.log(e)}
          />
        }
      </IonContent>
    </IonModal>
  );
}

export default QRScannerModal;