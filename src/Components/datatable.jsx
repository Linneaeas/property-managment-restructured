import React from "react";
import { useState } from "react";
import { EditButton, SaveButton, DeleteButton } from "./buttons";
import useDataTableActions from "../Hooks/useDataTableActions";
import { useLocalStorage } from '../Hooks/useLocalStorage';

export function DataTableRow({ item, onEdit, onDelete, onSave, handleInputChange, handleBedPersonsChange, handleBedSizeChange }) {
  const [editedName, setEditedName] = useState(item.name);

  const handleEditInputChange = (e) => {
    setEditedName(e.target.value);
  };

  return (
    <tr key={item.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(item.id)} />
      </td>
      <td className="NameBox">
        {item.isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleEditInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          item.name
        )}
      </td>
      {item.type === 'bed' && ( // Conditionally render for bed items only
        <>
          <td className="SizeBox">
            {item.isEditing ? (
              <input className="SmallInput"
                type="text"
                value={item.bedSize}
                onChange={(e) => handleBedSizeChange(item.id, e)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              item.bedSize
            )}
          </td>
          <td className="PersonsBox">
            {item.isEditing ? (
              <input className="SmallInput"
                type="text"
                value={item.bedPersons}
                onChange={(e) => handleBedPersonsChange(item.id, e)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              item.bedPersons
            )}
          </td>
        </>
      )}
      <td className="SaveOrDeleteBTNBox">
        {item.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(item.id)} />
            <SaveButton onSave={() => onSave(item.id, editedName)} />
          </>
        )}
      </td>
    </tr>
  );
}

export function DataTableContainer({ data, onEdit, onDelete, onSave, handleInputChange, handleBedPersonsChange, handleBedSizeChange }) {
  const hasBedItems = data.some((item) => item.type === 'bed');

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th></th>
          <th className="ColHeadline">Name</th>
          {hasBedItems && ( // Conditionally render for bed items only
            <>
              <th className="ColHeadline">Size:</th>
              <th className="ColHeadline">Prs.:</th>
            </>
          )}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <DataTableRow
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            handleInputChange={handleInputChange}
            handleBedPersonsChange={(id, e) => handleBedPersonsChange(id, e)}
            handleBedSizeChange={(id, e) => handleBedSizeChange(id, e)}
          />
        ))}
      </tbody>
    </table>
  );
}

