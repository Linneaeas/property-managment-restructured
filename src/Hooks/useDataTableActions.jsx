import { useState } from 'react';
import { useLocalStorage } from "./useLocalStorage";
import { EditButton} from "../Components/buttons"

const useDataTableActions = (initialData, itemType) => {
  const storageKey = `${itemType}s`;
  
  const { data, setData, getDataFromLocalStorage, handleSaveToLocalStorage } = useLocalStorage(initialData, storageKey);
   
    const [newName, setNewName] = useState('');
    const [bedSize, setBedSize] = useState('');
    const [bedPersons, setBedPersons] = useState('');
    const [isAddingNewItem, setIsAddingNewItem] = useState(false);
    const [isEditingItem, setIsEditingItem] = useState(false);
    const [showInput, setShowInput] = useState(false);
  

    const handleInputChange = (field, value) => {
      if (field === 'bedSize') {
        setBedSize(value);
      } else if (field === 'bedPersons') {
        setBedPersons(value);
      } else if (field === 'newName') {
        setNewName(value);
      } 
    
      const updatedData = data.map((item) =>
        item.id === field ? { ...item, [field]: parseInt(value, 10) || 0 } : item
      );
    
      setData(updatedData);
      handleSaveToLocalStorage(updatedData);
    };
    
    
    const handleAddButtonClick = () => {
      setNewName('');
      setBedSize('');  
      setBedPersons(''); 
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
          bedSize: parseInt(bedSize, 10) || 0,
          bedPersons: parseInt(bedPersons, 10) || 0,
          type: itemType,
          isEditing: false,
          editedName: '',
        };
    
        const updatedData = [...data, newItem];
        setData(updatedData);
        handleSaveToLocalStorage(updatedData);
        setNewName('');
        setBedSize('');
        setBedPersons('');
        setShowInput(false);
        setIsAddingNewItem(false);
      }
    };
    
   
      const handleEdit = (id) => {
        const updatedData = data.map((item) => ({
          ...item,
          isEditing: item.id === id ? !item.isEditing : true,
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


    const handleBedSizeChange = (id, e) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, bedSize: parseInt(e.target.value, 10) || 0 } : item
    );
    setData(updatedData);
    handleSaveToLocalStorage(updatedData);
  };
  
  const handleBedPersonsChange = (id, e) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, bedPersons: parseInt(e.target.value, 10) || 0 } : item
    );
    setData(updatedData);
    handleSaveToLocalStorage(updatedData);
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
    handleBedPersonsChange,
    handleBedSizeChange,

   
  };
};

export default useDataTableActions;