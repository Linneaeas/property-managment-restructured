import { useState } from 'react';
import { useDataManagement } from "./useDataManagment";

const useDataTableActions = (initialData, itemType) => {
  const storageKey = `${itemType}s`;
  
  const { data, setData, getDataFromLocalStorage, handleSaveToLocalStorage } = useDataManagement(initialData, storageKey);
   
    const [newName, setNewName] = useState('');
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [showInput, setShowInput] = useState(false);
  
    const handleInputChange = (id, value) => {
        setNewName(value); 
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, editedName: value } : item
        );
        setData(updatedData);
        handleSaveToLocalStorage(updatedData);
      };
  
    const handleAddButtonClick = () => {
      setNewName('');
      setShowInput(true);
      setIsAddingNewItem(true);
    };
  

    const handleAddItem = () => {
        if (newName.trim() !== '') {
          const isDuplicateName = data.some((item) => item.name === newName);
          if (isDuplicateName) {
            alert('Item with this name already exists. Please choose a new name.');
            return;
          }
          const newItem = {
            id: newName,
            name: newName,
            isEditing: false,
            editedName: '',
          };
          const updatedData = [...data, newItem];
          setData(updatedData);
          handleSaveToLocalStorage(updatedData);
          setNewName('');
          setShowInput(false);
          setIsAddingNewItem(false);
        }
      };
      const handleEdit = (id) => {
        const updatedData = data.map((item) => ({
          ...item,
          isEditing: item.id === id ? !item.isEditing : false,
        }));
        setData(updatedData);
        handleSaveToLocalStorage(updatedData);
      };
      const handleSave = (id, editedName) => {
        const updatedData = data.map((item) => {
          if (item.id === id) {
            setIsEditingItem(false);
            return { ...item, isEditing: false, name: editedName };
          }
          return item;
        });
        setData(updatedData);
        handleSaveToLocalStorage(updatedData);
      };
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    handleSaveToLocalStorage(updatedData);
  };
  const handleOutsideClick = () => {
    if (isAddingNewItem && !isEditingItem) {
      setIsAddingNewItem(false);
      setShowInput(false);
    }

    if (isEditingItem) {
      const updatedData = data.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setData(updatedData);
    handleSaveToLocalStorage(updatedData);
    }
  };
  return {
    data,
    newName,
    isAddingNewItem,
    isEditingItem,
    handleInputChange,
    handleAddButtonClick,
    handleAddItem,
    handleEdit,
    handleSave,
    handleDelete,
    handleOutsideClick,
    handleSaveToLocalStorage,
  };
};

export default useDataTableActions;