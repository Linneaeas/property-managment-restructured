import React from 'react';
import { AddButton, SaveButton, DeleteButton } from '../Components/buttons';
import OutsideClickListener from '../Components/event-listeners';
import { DataTableContainer } from '../Components/datatable';
import useDataTableActions from '../Components/datatable-actions';

export function AdminPropertyStandards() {
    const { data, newName, isAddingNewItem, isEditingItem, handleInputChange, handleAddButtonClick, handleAddItem, handleEdit, handleSave, handleDelete, handleOutsideClick, handleSaveToLocalStorage } = useDataTableActions([], 'standard');
    
    return (
      <div className="PropertyContainer">
        <OutsideClickListener onOutsideClick={handleOutsideClick}>
          <div className="PropertyContent">
            <h1>STANDARDS</h1>
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
                     placeholder="Enter standard name"
                     onClick={(e) => {
                     e.stopPropagation();
                     handleAddButtonClick();
                      }}
                      onFocus={(e) => e.stopPropagation()}
                       />
                <SaveButton onSave={() => handleAddItem('standard')} />
              </div>
            )}
          </div>
        </OutsideClickListener>
      </div>
    );
  }
  