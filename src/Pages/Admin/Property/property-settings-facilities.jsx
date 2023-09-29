import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { EditButton, SaveButton } from "../../../Components/buttons";
import OutsideClickListener from "../../../Components/event-listeners";
import CheckedIcon from "../../../Images/CheckedIcon.png";

export function DataTable({
  data,
  setData, 
  updatedData, 
  handleSaveToLocalStorage, 
  onEdit,
  onSave,
}) {
      
const { data: standards } = useLocalStorage([], 'standards');
const { data: facilities } = useLocalStorage([], 'facilities');

  const facilityHeaders = facilities.map((facility) => (
    <th className="ColHeadline" key={facility.id}>
      {facility.name}
    </th>
  ));

  const handleFacilityOptionChange = (id, isChecked, facility) => {
    const updatedData = standards.map((standard) =>
      standard.id === id
        ? {
            ...standard,
            facilityOption: {
              ...standard.facilityOption,
              [facility.id]: isChecked,
            },
          }
        : standard
    );
    setData(updatedData);
  };

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th className="ColHeadlineBigger">Standard:</th>
          <th></th>
          {facilityHeaders}
        </tr>
      </thead>
      <tbody>
        {standards.map((standard) => (
          <tr key={standard.id}>
            <td className="ColHeadline">{standard.name}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(standard.id)} />
            </td>
            {facilities.map((facility) => (
              <td key={facility.id} className="StandardFacilityBox">
                {standard.isEditing ? (
                  <div className="Checkbox">
                    <input
                      type="checkbox"
                      className="Checkbox"
                      checked={
                        standard.facilityOption &&
                        standard.facilityOption[facility.id]
                      }
                      onChange={(e) =>
                        handleFacilityOptionChange(
                          standard.id,
                          facility.id,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ) : standard.facilityOption &&
                  standard.facilityOption[facility.id] ? (
                  <div className="OptionChoice">
                    <img
                      className="CheckedIcon"
                      src={CheckedIcon}
                      alt="Checked icon"
                    />
                  </div>
                ) : (
                  <div className="OptionChoice">
                    <span className="NoSelection">-</span>
                  </div>
                )}
              </td>
            ))}
            <td className="SaveBTNBox">
              {standard.isEditing && (
                <>
                  <SaveButton onSave={() => onSave(standard.id)} />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AdminSettingsFacilities() {
    const { data, setData, updatedData, onEdit, onSave, handleSaveToLocalStorage} = useLocalStorage([], 'standards');

    const { data: standards } = useLocalStorage([], 'standards');
    const { data: facilities } = useLocalStorage([], 'facilities');

  const [showInput, setShowInput] = useState(false);
  const [isEditingStandard, setIsEditingStandard] = useState(false);
 

 
  const handleEdit = (id) => {
    console.log('Editing standard with ID:', id);
    const updatedData = standards.map((standard) => {
      if (standard.id === id) {
        return {
          ...standard,
          isEditing: !standard.isEditing,
        };
      }
      return {
        ...standard,
        isEditing: false,
      };
    });

    setData(updatedData);
  };

  const handleSave = (id) => {
    const updatedData = standards.map((standard) => {
      if (standard.id === id) {
        return {
          ...standard,
          isEditing: false,
          selectedFacilitySetting: standard.selectedFacilitySetting,
        };
      }
      return standard;
    });

    setData(updatedData);
    handleSaveToLocalStorage(updatedData);
  };

  const handleOutsideClick = () => {
    if (!isEditingStandard) {
      setShowInput(false);
    }

    if (isEditingStandard) {
      const updatedData= standards.map((standard) => ({
        ...standard,
        isEditing: false,
      }));
      setData(updatedData);
      setIsEditingStandard(false);
    }
  };

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>FACILITIES</h1>
          <h2>Standards & facilities</h2>
          <DataTable
            data={data}
            setData={setData}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditingStandard={isEditingStandard}
            handleOutsideClick={handleOutsideClick}
            handleSaveToLocalStorage={handleSaveToLocalStorage}
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}