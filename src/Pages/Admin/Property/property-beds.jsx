import React from 'react';
import { AddButton, SaveButton, DeleteButton } from '../../../Components/buttons';
import OutsideClickListener from '../../../Components/event-listeners';
import { DataTableContainer } from '../../../Components/datatable';
import useDataTableActions from '../../../Hooks/useDataTableActions';
import { useLocalStorage } from '../../../Hooks/useLocalStorage';

export function AdminPropertyBeds() {
    // Destructure values from the useDataTableActions hook
    const { data, item, newName, bedSize, bedPersons, isAddingNewItem, isEditingItem, handleInputChange, handleAddButtonClick, handleAddItem, handleEdit, handleSave, handleDelete, handleBedPersonsChange, handleBedSizeChange, handleOutsideClick, handleSaveToLocalStorage } = useDataTableActions([], 'bed');

   

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
              handleBedPersonsChange={handleBedPersonsChange}
              handleBedSizeChange={handleBedSizeChange}
            />
            {!isAddingNewItem && <AddButton onAdd={handleAddButtonClick} />}
            {isAddingNewItem && (
              <div className="AddContent">
                      <input
                     type="text"
                     value={newName}
                    onChange={(e) => handleInputChange('newName', e.target.value)}
                     placeholder="Enter bed name"
                         onClick={(e) => {
                          e.stopPropagation();
                         handleAddButtonClick();
                           }}
                       onFocus={(e) => e.stopPropagation()}
                         />
                         <input
  className="SmallInput"
  type="text"
  value={bedSize}
  placeholder="CM"
  maxLength="3"
  onChange={(e) => handleInputChange('bedSize', e.target.value)}
/>
<input
  className="SmallInput"
  type="text"
  value={bedPersons}
  placeholder="PRS"
  maxLength="3"
  onChange={(e) => handleInputChange('bedPersons', e.target.value)}
/>
                <SaveButton onSave={() => handleAddItem('bed')} />
              </div>
            )}
          </div>
        </OutsideClickListener>
      </div>
    ); }