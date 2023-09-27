import React from 'react';
import { AddButton, SaveButton, DeleteButton } from '../../../Components/buttons';
import OutsideClickListener from '../../../Components/event-listeners';
import { DataTableContainer } from '../../../Components/datatable';
import useDataTableActions from '../../../Hooks/useDataTableActions';

export function AdminPropertyBeds() {
    // Destructure values from the useDataTableActions hook
    const { data, newName, isAddingNewItem, isEditingItem, handleInputChange, handleAddButtonClick, handleAddItem, handleEdit, handleSave, handleDelete, handleOutsideClick, handleSaveToLocalStorage } = useDataTableActions([], 'bed');

    return (
      <div className="PropertyContainer">
        <OutsideClickListener onOutsideClick={handleOutsideClick}>
          <div className="PropertyContent">
            <h1>BEDS</h1>
            <DataTableContainer
              data={data} 
              onEdit={handleEdit}
              onSave={handleSave}
              onDelete={handleDelete}
              handleInputChange={handleInputChange}
            />
            {!isAddingNewItem && <AddButton onAdd={handleAddButtonClick} />}
            {isAddingNewItem && (
              <div className="AddContent">
                   <input
                     type="text"
                     value={newName}  // Ensure the input field is bound to newName
                     onChange={(e) => handleInputChange('newName', e.target.value)}
                     placeholder="Enter bed name"
                     onClick={(e) => {
                     e.stopPropagation();
                     handleAddButtonClick();
                      }}
                      onFocus={(e) => e.stopPropagation()}
                       />
                <SaveButton onSave={() => handleAddItem('bed')} />
              </div>
            )}
          </div>
        </OutsideClickListener>
      </div>
    ); }