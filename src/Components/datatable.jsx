import React from "react";
import { useState } from "react";
import { EditButton, SaveButton, DeleteButton } from "./buttons";
import {useDataTableActions} from "./datatable-actions"


export function DataTableRow({ item, onEdit, onDelete, onSave, handleInputChange }) {
    const [editedName, setEditedName] = useState(item.name); // Add local state for editedName
    const handleEditInputChange = (e) => {
        setEditedName(e.target.value);
      };
  return (
    <tr key={item.id}>
    <td className="EditBTNBox">
      <EditButton onEdit={() => onEdit(item.id)} />
    </td>
    <div className="AddContent">
    <td className="NameBox">
      {item.isEditing ? (
        <input
          type="text"
          value={editedName} // Use editedName for the input value
          onChange={handleEditInputChange} // Use local state to handle input changes
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        item.name
      )}
    </td>
      <td className="SaveOrDeleteBTNBox">
        {item.isEditing && (
          <>
            <DeleteButton onDelete={() => onDelete(item.id)} />
            <SaveButton onSave={() => onSave(item.id)} />
          </>
        )}
      </td></div>
    </tr>
  );
}

export function DataTableContainer({ data, onEdit, onDelete, onSave, handleInputChange }) {

  return (
    <table className="PropertyTable">
      <tbody>
        {data.map((item) => (
          <DataTableRow
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            handleInputChange={handleInputChange}
          />
        ))}
      </tbody>
    </table>
  );
}
