import { IonModal } from "@ionic/react";
import React, { useState } from "react";
import QrReader from "react-qr-reader";

export interface QRScannerModalProps {
  isOpen: boolean
  handleDismiss: () => void;
  handleSuccess: () => void;
}

const QRScannerModal: React.SFC<QRScannerModalProps> = ({ isOpen, handleDismiss, handleSuccess }) => {
  const PASSPHRASE = 'Presence detected!'
  const [scanSuccess, setScanSuccess] = useState(false);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss} swipeToClose >
      <h1>Scan QR Code</h1>
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
    </IonModal>
  );
}

export default QRScannerModal;