import React from 'react';
import { useDataManagement } from '../../Hooks/useDataManagment';

export function AdminPropertyOverview() {
  const { data: standards } = useDataManagement([], 'standards');
  const { data: suites } = useDataManagement([], 'suites');
  const { data: beds } = useDataManagement([], 'beds');
  const { data: roomtypes } = useDataManagement([], 'roomtypes');
  const { data: facilities } = useDataManagement([], 'facilities');
  const { data: properties } = useDataManagement([], 'properties');

  console.log('Beds Data newnew:', beds);

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
          <li key={bed.id}>{bed.name}</li>
        ))}
      </ul>
      <ul>
        {roomtypes.map((roomtype) => (
          <li key={roomtype.id}>{roomtype.name}</li>
        ))}
      </ul>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.id}>{facility.name}</li>
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

