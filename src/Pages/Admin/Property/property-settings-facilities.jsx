import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { EditButton, SaveButton } from "../../../Components/buttons";
import OutsideClickListener from "../../../Components/event-listeners";
import CheckedIcon from "../../../Images/CheckedIcon.png";
import useDataTableActions from "../../../Hooks/useDataTableActions";

export function DataTable() {
  const {
    data: standards,
    handleEdit,
    handleSave,
    handleDelete,
    handleOutsideClick,
    facilityOption,
    handleFacilityOptionChange,
    setFacilityOption,
    handleSaveToLocalStorage,
    onEdit, onSave
  } = useDataTableActions([], 'standards');

  const { data: facilities } = useLocalStorage([], 'facilities');

  const facilityHeaders = facilities.map((facility) => (
    <th className="ColHeadline" key={facility.id}>
      {facility.name}
    </th>
  ));

  const handleEditInputChange = (e) => {
    setFacilityOption(e.target.value);
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
  const { data, setData, item, isEditingItem, handleInputChange, handleEdit, handleSave, handleDelete,  handleOutsideClick, facilityOption, setFacilityOption, handleFacilityOptionChange, handleSaveToLocalStorage } = useDataTableActions([], 'standards');



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
            handleFacilityOptionChange={handleFacilityOptionChange}
            setFacilityOption={setFacilityOption}
            facilityOption={facilityOption}
            handleOutsideClick={handleOutsideClick}
            handleSaveToLocalStorage={handleSaveToLocalStorage}
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}
