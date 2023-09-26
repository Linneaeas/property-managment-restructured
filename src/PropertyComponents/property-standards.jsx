import React, { useState } from "react";
import { AddButton, EditButton, SaveButton, DeleteButton } from "../Components/buttons";
import OutsideClickListener from "../Components/event-listeners";
import { DataTableContainer } from "../Components/datatable";
import { DataTableRow } from "../Components/datatable";
import { useDataManagement } from "../Components/data-managment";



export function AdminPropertyStandards() {
    const { data: standards, setData: setStandards, handleSaveToLocalStorage } = useDataManagement(
        [], 
        "standards"
      );
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [isAddingNewStandard, setIsAddingNewStandard] = useState(false);
  const [isEditingStandard, setIsEditingStandard] = useState(false);

  const handleInputChange = (id, value) => {
    const updatedStandards = standards.map((std) =>
      std.id === id ? { ...std, editedName: value } : std
    );
    setStandards(updatedStandards);
  };

  const handleAddButtonClick = () => {
    setNewName("");
    setShowInput(true);
    setIsAddingNewStandard(true);
  };

  const handleAddStandard = () => {
    if (newName.trim() !== "") {
      const isDuplicateName = standards.some(
        (standard) => standard.name === newName
      );

      if (isDuplicateName) {
        alert(
          "Standard with this name already exists. Please choose a new name."
        );
        return;
      }

      const newStandard = {
        id: newName,
        name: newName,
        isEditing: false,
        editedName: "",
      };
      const updatedStandards = [...standards, newStandard];
      setStandards(updatedStandards);
      handleSaveToLocalStorage(updatedStandards); 
      setNewName("");
      setShowInput(false);
      setIsAddingNewStandard(false);
    }
  };

  const handleEdit = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(true);
        return {
          ...item,
          isEditing: !item.isEditing,
          editedName: item.name,
        };
      }
      return { ...item, isEditing: false };
    });
    setStandards(updatedStandards);
    handleSaveToLocalStorage(updatedStandards); 
  };

  const handleSave = (id) => {
    const updatedStandards = standards.map((item) => {
      if (item.id === id) {
        setIsEditingStandard(false);
        return { ...item, isEditing: false, name: item.editedName };
      }
      return item;
    });
    setStandards(updatedStandards);
    handleSaveToLocalStorage(updatedStandards); 
  };

  const handleDelete = (id) => {
    const updatedStandards = standards.filter((item) => item.id !== id);
    setStandards(updatedStandards);
    handleSaveToLocalStorage(updatedStandards); 
  };

  const handleOutsideClick = () => {
    if (isAddingNewStandard && !isEditingStandard) {
      setIsAddingNewStandard(false);
      setShowInput(false);
    }

    if (isEditingStandard) {
      const updatedStandards = standards.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setStandards(updatedStandards);
      setIsEditingStandard(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>STANDARDS</h1>
          <DataTableContainer
            data={standards}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={handleDelete}
            handleInputChange={handleInputChange}
          />
          {!showInput && <AddButton onAdd={handleAddButtonClick} />}
          {showInput && (
            <div className="AddContent">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter standard name"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingNewStandard(true);
                }}
                onFocus={(e) => e.stopPropagation()}
              />
              <SaveButton onSave={handleAddStandard} />
            </div>
          )}
        </div>
      </OutsideClickListener>
    </div>
  );
}