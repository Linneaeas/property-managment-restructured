import React from 'react';
import { useLocalStorage } from '../../Hooks/useLocalStorage';

export function AdminPropertyOverview() {
  const { data: standards } = useLocalStorage([], 'standards');
  const { data: suites } = useLocalStorage([], 'suites');
  const { data: beds } = useLocalStorage([], 'beds');
  const { data: roomtypes } = useLocalStorage([], 'roomtypes');
  const { data: facilities } = useLocalStorage([], 'facilities');
  const { data: properties } = useLocalStorage([], 'properties');

  
  return (
    <div className='PropertyContent'>
      <h1>Overview</h1>
      <ul>
        {standards.map((standard) => (
          <li key={standard.id}>{standard.name}</li>
        ))}
      </ul>
      <ul>
        {suites.map((suite) => (
          <li key={suite.id}>{suite.name}</li>
        ))}
      </ul>
      <ul>
  {beds.map((bed) => (
    <li key={bed.id}>
      {bed.name} - Size: {bed.bedSize} cm, Persons: {bed.bedPersons}
    </li>
  ))}
</ul>
      <ul>
        {roomtypes.map((roomtype) => (
          <li key={roomtype.id}>{roomtype.name}</li>
        ))}
      </ul>
      <ul>
        {facilities.map((facilitie) => (
          <li key={facilitie.id}>{facilitie.name}</li>
        ))}
      </ul>
      <ul>
        {properties.map((propertie) => (
          <li key={propertie.id}>{propertie.name}</li>
        ))}
      </ul>
    </div>
  );
}

