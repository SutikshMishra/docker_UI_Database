import React, { useState } from 'react';
//hello
function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValues, setInputValues] = useState({
    option1: [],
    option2: [],
    option3: []
  });

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    // Reset inputs when dropdown changes
    setInputValues({
      ...inputValues,
      [selectedOption]: [] // Clear input values for previously selected option
    });
  };

  const handleAddInput = () => {
    setInputValues({
      ...inputValues,
      [selectedOption]: [...inputValues[selectedOption], '']
    });
  };

  const handleInputChange = (option, index, value) => {
    const newInputValues = { ...inputValues };
    newInputValues[option][index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted");
  };

  const renderFileFormatDropdown = () => {
    return (
      <>
        <div>
          <label htmlFor="fileFormatDropdown">File Format:</label>
          <select id="fileFormatDropdown">
            <option value="parquet">Parquet</option>
            <option value="xml">XML</option>
          </select>
        </div>
      </>
    );
  };

  const renderActionDropdown = () => {
    return (
      <>
        <div>
          <label htmlFor="actionDropdown">Action:</label>
          <select id="actionDropdown">
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="show">Show</option>
          </select>
        </div>
      </>
    );
  };

  const renderInput = () => {
      return (
        <>
          <div>
            <label htmlFor="inputField">Input:</label>
            <input type="text" id="inputField" />
          </div>
        </>
      );
    };

  return (
    <div className="App">
      <h1>Frontend</h1>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
        <option value="">Select</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      {selectedOption && (
        <>
          <h2>{selectedOption}</h2>
          {(selectedOption === "option1" || selectedOption === "option3") && (
          <>
            {renderFileFormatDropdown()}
            {renderActionDropdown()}
          </>
          )}
          {(selectedOption === "option2" ) &&
          (
            <>
              {renderActionDropdown()}
              {renderInput()}
            </>
          )}
          {inputValues[selectedOption].map((inputValue, index) => (
            <input
              key={index}
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(selectedOption, index, e.target.value)}
            />
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}


    </div>
  );
}
export default App;
