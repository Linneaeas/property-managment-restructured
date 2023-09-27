import React, { useEffect, useState } from "react";
import { EditButton, SaveButton } from '../../../Components/buttons';
import OutsideClickListener from '../../../Components/event-listeners';
import useDataTableActions from '../../../Hooks/useDataTableActions';
import {useDataManagement } from "../../../Hooks/useDataManagment";


export function DataTable({ item, data,  onEdit, onSave, handleInputChange, handlePropertieOptionChange, handleStandardOptionChange, handleOutsideClick, handleEdit, handleSave,}) {
      

const { data: standards } = useDataManagement([], 'standards');
const { data: suites } = useDataManagement([], 'suites');
const { data: properties } = useDataManagement([], 'properties');


  const propertieHeaders = properties.map((propertie) => (
    <th className="ColHeadline" key={propertie.id}>
      {propertie.name}
    </th>
  ));

  return (
    <table className="PropertyTable">
      <thead>
        <tr>
          <th className="ColHeadlineBigger">Suite:</th>
          <th></th>
          <th className="ColHeadline">Standard:</th>
          {propertieHeaders}
        </tr>
      </thead>
      <tbody>
        {suites.map((suite) => (
          <tr key={suite.id}>
            <td className="ColHeadline">{suite.id}</td>
            <td className="EditBTNBox">
              <EditButton onEdit={() => onEdit(suite.name)} />
            </td>
            <td className="SuitesStandardBox">
              {suite.isEditing ? (
                <div className="InputWithDatalist">
                  <select
                    value={suite.selectedStandard}
                    onChange={(e) => {
                      handleStandardOptionChange(suite.id, e.target.value);
                    }}
                  >
                    <option value="">Select a standard</option>
                    {standards.map((standard) => (
                      <option key={standard.id} value={standard.name}>
                        {standard.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                suite.selectedStandard || (
                  <span className="NoSelection">{"-"}</span>
                )
              )}
            </td>
            {properties.map((propertie) => (
              <td key={propertie.id} className="SuitePropertieBox">
                {suite.isEditing ? (
                  <div className="ManualInputSetting">
                    <input
                      type="text"
                      className="SmallInput"
                      value={
                        (suite.propertieOptions &&
                          suite.propertieOptions[propertie.id]) ||
                        ""
                      }
                      onChange={(e) =>
                        handlePropertieOptionChange(
                          suite.id,
                          propertie.id,
                          e.target.value
                        )
                      }
                    ></input>
                  </div>
                ) : (
                  <div className="OptionChoice">
                    {suite.propertieOptions &&
                    suite.propertieOptions[propertie.id] ? (
                      <span className="OptionChoice">
                        {suite.propertieOptions[propertie.id]}
                      </span>
                    ) : (
                      <span className="NoSelection">{"-"}</span>
                    )}
                  </div>
                )}
              </td>
            ))}

            <td className="SaveBTNBox">
              {suite.isEditing && (
                <>
                  <SaveButton onSave={() => onSave(suite.id)} />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AdminSettingsSuites() {
    const { data, item, newName, selectedPropertie, selectedStandard, isEditingItem, handleInputChange, handleEdit, handleSave, handlePropertieOptionChange, handleStandardOptionChange, handleOutsideClick, handleSaveToLocalStorage, onEdit,} = useDataTableActions([], 'suite');

       
        

  const [showInput, setShowInput] = useState(false);
  const [isEditingSuite, setIsEditingSuite] = useState(false);

  return (
    <div className="PropertyContainer">
      <OutsideClickListener onOutsideClick={handleOutsideClick}>
        <div className="PropertyContent">
          <h1>SUITES</h1>
          <h2>Suites, standard & properties</h2>
          <DataTable
              data={data} 
              onEdit={handleEdit}
              onSave={handleSave}
              handleInputChange={handleInputChange}
              handlePropertieOptionChange={handlePropertieOptionChange}
              handleStandardOptionChange={handleStandardOptionChange}
             
          />
        </div>
      </OutsideClickListener>
    </div>
  );
}