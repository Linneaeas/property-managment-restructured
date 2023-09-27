import React from 'react';
import { AddButton, SaveButton, DeleteButton } from '../../../Components/buttons';
import OutsideClickListener from '../../../Components/event-listeners';
import { DataTableContainer } from '../../../Components/datatable';
import useDataTableActions from '../../../Hooks/useDataTableActions';

export function AdminPropertyProperties() {
    // Destructure values from the useDataTableActions hook
    const { data, newName, isAddingNewItem, isEditingItem, handleInputChange, handleAddButtonClick, handleAddItem, handleEdit, handleSave, handleDelete, handleOutsideClick, handleSaveToLocalStorage } = useDataTableActions([], 'propertie');

    return (
      <div className="PropertyContainer">
        <OutsideClickListener onOutsideClick={handleOutsideClick}>
          <div className="PropertyContent">
            <h1>PROPERTIES</h1>
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
                     placeholder="Enter property name"
                     onClick={(e) => {
                     e.stopPropagation();
                     handleAddButtonClick();
                      }}
                      onFocus={(e) => e.stopPropagation()}
                       />
                <SaveButton onSave={() => handleAddItem('propertie')} />
              </div>
            )}
          </div>
        </OutsideClickListener>
      </div>
    ); }