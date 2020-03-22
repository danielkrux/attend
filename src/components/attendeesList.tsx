import { IonList, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import CanvasDraw from "react-canvas-draw";

export interface AttendeesListProps {
  attendees: any[];
}

const AttendeesList: React.SFC<AttendeesListProps> = ({ attendees }) => {
  return (
    <IonList>
      {attendees.map((a: any, i: number) => {
        const submittedAt = new Date(a.submittedAt);
        const DATE = submittedAt.toLocaleDateString(['nl']);
        const TIME = submittedAt.toLocaleTimeString(['nl'], { hour: '2-digit', minute: '2-digit' });
        return (
          <IonItem className='attendence-row' key={i}>
            <IonLabel>
              <h2>{a.firstname}&nbsp;{a.lastname}</h2>
              <p>{DATE}&nbsp;{TIME}</p>
              <p>{a.location.adress}</p>
            </IonLabel>
            {(attendees && a && a.signature) && <CanvasDraw
              style={{ marginBottom: '.5rem', height: '100px', width: '100px' }}
              disabled
              canvasHeight={100}
              canvasWidth={100}
              immediateLoading={true}
              saveData={a.signature}
              loadTimeOffset={10}
            />}
          </IonItem>
        )
      })}
    </IonList>
  );
}

export default AttendeesList;