import React, { useEffect, useState } from "react";
import { EditButton, SaveButton } from '../../../Components/buttons';
import OutsideClickListener from '../../../Components/event-listeners';
import { useLocalStorage } from "../../../Hooks/useLocalStorage";


export function DataTable({  data, setData, updatedData, handleSaveToLocalStorage,  onEdit, onSave, selectedPropertie, selectedStandard}) {
  
const { data: standards } = useLocalStorage([], 'standards');
const { data: suites } = useLocalStorage([], 'suites');
const { data: properties } = useLocalStorage([], 'properties');

const propertieHeaders = properties.map((propertie) => (
  <th className="ColHeadline" key={propertie.id}>
    {propertie.name}
  </th>
));

const handleStandardOptionChange = (value,) => {
  const updatedData = suites.map((suite) =>
    suite === suite
     ? {
          ...suite,
          selectedStandard: value,
        }
      : suite
  );
  setData(updatedData);
};

const handlePropertieOptionChange = (propertie, value) => {
  const updatedData = suites.map((suite) =>
    suite === suite
      ? {
          ...suite,
          selectedPropertie: {
            ...suite.selectedPropertie,
            [propertie.id]: parseInt(value, 10),
          },
        }
      : suite
  );
  setData(updatedData);
};


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
            <td className="ColHeadline">{suite.name}</td>
            <td className="EditBTNBox">
            <EditButton onEdit={() => onEdit(suite.id)} />
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
                        (suite.selectedPropertie &&
                          suite.selectedPropertie[propertie.id]) ||
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
                    {suite.selectedPropertie &&
                    suite.selectedPropertie[propertie.id] ? (
                      <span className="OptionChoice">
                        {suite.selectedPropertie[propertie.id]}
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
    const { data, setData, updatedData, onEdit, onSave, handlePropertieOptionChange, handleStandardOptionChange, handleSaveToLocalStorage} = useLocalStorage([], 'suite');
    const [isEditingSuite, setIsEditingSuite] = useState(false);
    const [selectedStandard, setSelectedStandard] = useState('');
    const [selectedPropertie, setSelectedPropertie] = useState('');
    const [showInput, setShowInput] = useState(false);

    const handleEdit = (id) => {
      console.log("Edit triggered with id:", id);
      const updatedData = data.map((suite) => ({
        ...suite,
        isEditing: id === id ? !suite.isEditing : true,
      })); 
      setData(updatedData); 
    };
    
    const handleSave = (id, selectedPropertie, selectedStandard) => {
      const updatedData = data.map((suite) => {
        if (suite.id === id) {
          setIsEditingSuite(false);
          return { ...suite, isEditing: false, selectedPropertie: selectedPropertie, selectedStandard: selectedStandard};
        }
        return suite;
      });
      setData(updatedData);
      handleSaveToLocalStorage(updatedData);
    };


  return (
    <div className="PropertyContainer">
    
        <div className="PropertyContent">
          <h1>SUITES</h1>
          <h2>Suites, standard & properties</h2>
          <DataTable
              data={data} 
              onEdit={handleEdit}
              onSave={handleSave}
              setData={setData}
              setIsEditingSuite={setIsEditingSuite}
              isEditingSuite={isEditingSuite}
              handlePropertieOptionChange={handlePropertieOptionChange}
              handleStandardOptionChange={handleStandardOptionChange}
              selectedStandard={selectedStandard}
              selectedPropertie={selectedPropertie}
              setSelectedStandard={setSelectedStandard}
              SetSelectedPropertie={setSelectedPropertie}
          />
        </div>
    </div>
  );
}