import { IonModal, isPlatform, useIonViewWillEnter } from "@ionic/react";
import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";

declare let window: any;

export interface QRScannerModalProps {
  isOpen: boolean
  handleDismiss: () => void;
  handleSuccess: () => void;
}

const QRScannerModal: React.SFC<QRScannerModalProps> = ({ isOpen, handleDismiss, handleSuccess }) => {
  const PASSPHRASE = 'Presence detected!'
  const [scanSuccess, setScanSuccess] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (isPlatform('mobile') && isOpen) {
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

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss} swipeToClose >
      <h1>Scan QR Code</h1>
      {isPlatform("mobile") ?
        <>

        </>
        :
        <QrReader
          legacyMode={false}
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
    </IonModal>
  );
}

export default QRScannerModal;