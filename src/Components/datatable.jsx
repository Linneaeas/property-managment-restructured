import React from "react";
import { useState } from "react";
import { EditButton, SaveButton, DeleteButton } from "./buttons";
import useDataTableActions from "../Hooks/useDataTableActions";


export function DataTableRow({ item, onEdit, onDelete, onSave, handleInputChange, handleBedPersonsChange, handleBedSizeChange, }) {
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
      <td className="SaveOrDeleteBTNBox">
        {item.isEditing && (// This is a conditional rendering using a logical && operator. If item.isEditing is true, it will render the content inside the parentheses. Otherwise, it will render nothing.
        //The onDelete function is passed as a prop to this component. When the delete button is clicked, it calls onDelete with item.id as an argument.
          <>
            <DeleteButton onDelete={() => onDelete(item.id)} />
            <SaveButton
              onSave={() => {
                onSave(item.id, editedName); // Pass editedName to onSave
              }}//The onSave function is passed as a prop to this component. When the save button is clicked, it calls an anonymous arrow function which in turn calls onSave with item.id and editedName as arguments.
            />
          </>
        )}
      </td>
    </tr>
  );
}
export function DataTableContainer({ data, onEdit, onDelete, onSave, handleInputChange, handleBedPersonsChange, handleBedSizeChange }) {
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
            handleBedPersonsChange={(id, e) => handleBedPersonsChange(id, e)} 
            handleBedSizeChange={(id, e) => handleBedSizeChange(id, e)} 
          />
        ))}
      </tbody>
    </table>
  );
}