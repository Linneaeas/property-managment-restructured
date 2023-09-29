import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { EditButton, SaveButton } from "../../../Components/buttons";
import OutsideClickListener from "../../../Components/event-listeners";
import CheckedIcon from "../../../Images/CheckedIcon.png";


export function AdminSettingsFacilities() {
  
    const {data, setData, updatedData, handleSaveToLocalStorage}=
        useLocalStorage([],'standards')

  const { data: standards } = useLocalStorage([], 'standards');
  const { data: facilities } = useLocalStorage([], 'facilities');
  const [isEditingStandard, setIsEditingStandard] = useState(false);
  const [facilitieOption, setFacilitieOption] = useState('');
  
 
  const facilitieHeaders = facilities.map((facilitie) => (
    <th className="ColHeadline" key={facilitie.id}>
      {facilitie.name}
    </th>
  ));

  const handleEditInputChange = (e) => {
    setFacilitieOption(e.target.value);
    setData(updatedData);
  };
  

  const onEdit = (id) => {
    const updatedData = standards.map((standard) => ({
      ...standard,
      isEditing: standard.id === id ? !standard.isEditing : false,
    }));
    setData(updatedData);
  };

  const onSave = (id, facilitieOption, value, standards) => {
    const updatedData = standards.map((standard) => {
      if (standard.id === id) {
        setIsEditingStandard(false);
        return { ...standard, isEditing: false, facilitieOption: value};
      }
      return standard;
    });
        setData(updatedData);
        handleSaveToLocalStorage(updatedData);
        setFacilitieOption('');
      }
  

  const handleFacilitieOptionChange = (id, isChecked, facilitie, standard) => {
    const updatedData = standards.map((standard) =>
      standard.id === id
        ? {
            ...standard,
            facilitieOption: {
              ...standard.facilitieOption,
              [facilitie.id]: isChecked,
            },
          }
        : standard
    );
    setData(updatedData);
  };


  return (
    <main className="PropertyContainer">
        <div className="PropertyContent">
          <h1>FACILITIES</h1>
          <h2>Standards & facilities</h2>
    <table className="PropertyTable">
    
      <thead>
        <tr>
          <th className="ColHeadlineBigger">Standard:</th>
          <th></th>
          {facilitieHeaders}
        </tr>
      </thead>
      <tbody>
        {standards.map((standard) => (
          <tr key={standard.id}>
            <td className="ColHeadline">{standard.name}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(standard.id)} />
            </td>
            {facilities.map((facilitie) => (
              <td key={facilitie.id} className="StandardFacilityBox">
                {standard.isEditing ? (
                  <div className="Checkbox">
                    <input
                      type="checkbox"
                      className="Checkbox"
                      checked={
                        standard.facilitieOption &&
                        standard.facilitieOption[facilitie.id]
                      }
                      onChange={(e) =>
                        handleFacilitieOptionChange(
                          standard.id,
                          facilitie.id,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                ) : standard.facilitieOption &&
                  standard.facilitieOption[facilitie.id] ? (
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
 </div>
 </main>
  );
}

