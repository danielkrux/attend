import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { median } from '../../util/helpers';
import './attendeesMap.css';
import { useIonViewDidEnter } from '@ionic/react';

export interface AttendeesMapProps {
  attendees?: []
}

export interface MarkerProps {
  name: string;
  lat: any;
  lng: any;
}

const Marker: React.SFC<MarkerProps> = ({ name }) => <div className="marker">{name}</div>;

const AttendeesMap: React.SFC<AttendeesMapProps> = ({ attendees }) => {

  const [center, setCenter] = useState({ lat: 51.3, lng: 4.9 });
  const [zoom, setZoom] = useState(6);

  useIonViewDidEnter(() => {
    const calculateCenter = () => {
      let latMedian;
      let lngMedian;
      if (attendees !== undefined) {
        const lats = attendees?.map((a: any) => a.location.lat);
        const lngs = attendees?.map((a: any) => a.location.lon);
        latMedian = median(lats)
        lngMedian = median(lngs)
      }
      setCenter({ lat: latMedian, lng: lngMedian })
    }
    calculateCenter()
  })


  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDgMROM_H8cvr9WZ-0gU1D53yC-C74D4wM' }}
        defaultCenter={center}
        defaultZoom={zoom}
        draggable
        yesIWantToUseGoogleMapApiInternals
        options={{
          disableDefaultUI: true,
          zoomControl: true
        }}
      >
        {
        attendees?.map((a: any, i: number) => {
          return (
            <Marker
              key={i}
              lat={a.location.lat}
              lng={a.location.lon}
              name={`${a.firstname} ${a.location.lat} ${a.location.lon}`}
            />
          )
        })
        }
      </GoogleMapReact>
    </div>
  );
}

export default AttendeesMap