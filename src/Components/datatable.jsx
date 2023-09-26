import React from "react";
import { EditButton, SaveButton, DeleteButton } from "./buttons";

export function DataTableRow({ item, onEdit, onDelete, onSave, handleInputChange }) {
  return (
    <tr key={item.id}>
      <td className="EditBTNBox">
        <EditButton onEdit={() => onEdit(item.id)} />
      </td>
      <td className="NameBox">
      {console.log(item)} 
        {item.isEditing ? (
          <input
            type="text"
            value={item.editedName}
            onChange={(e) => handleInputChange(item.id, e.target.value)}
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
      </td>
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
