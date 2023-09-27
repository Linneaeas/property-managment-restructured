import React from 'react';
import { useDataManagement } from '../../Hooks/useDataManagment';

export function AdminPropertyOverview() {
  const { data: standards } = useDataManagement([], 'standards');

  return (
    <div>
      <h1>Overview</h1>
      <ul>
        {standards.map((standard) => (
          <li key={standard.id}>{standard.name}</li>
        ))}
      </ul>
    </div>
  );
}

