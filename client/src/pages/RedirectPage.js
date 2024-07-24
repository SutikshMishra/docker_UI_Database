// App.js

import React, { useState } from 'react';
import './RedirectPage.css'; // Import your CSS file for styling

function RedirectPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValues, setInputValues] = useState({
        option1: [],
        option2: [],
        option3: []
    });
    const [downloadUrl, setDownloadUrl] = useState('');

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
        // Make a POST request to the backend endpoint to trigger mvn clean install
        fetch('http://localhost:4000/run-mvn-install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (response.ok) {
                    console.log('mvn clean install command executed successfully');
                    // If mvn clean install is successful, trigger the download
                    handleDownload();
                } else {
                    console.error('Failed to execute mvn clean install command');
                }
            })
            .catch(error => {
                console.error('Error while executing mvn clean install command:', error);
            });
    };

    const handleDownload = () => {
        // Fetch the JAR file from the server
        fetch('http://localhost:4000/run-mvn-install')
            .then(response => response.blob())
            .then(blob => {
                // Create a temporary URL for the downloaded file
                const url = window.URL.createObjectURL(new Blob([blob]));
                setDownloadUrl(url);
            })
            .catch(error => console.error('Error downloading JAR file:', error));
    };


    const renderFileFormatDropdown = () => {
        return (
            <>
                <div className="input-group">
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
                <div className="input-group">
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
                <div className="input-group">
                    <label htmlFor="inputField">Input:</label>
                    <input type="text" id="inputField" />
                </div>
            </>
        );
    };

    return (
        <div className="RedirectPage">
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
                    {(selectedOption === "option2") &&
                        (
                            <>
                                {renderActionDropdown()}
                                {renderInput()}
                            </>
                        )}
                    {inputValues[selectedOption].map((inputValue, index) => (
                        <div className="input-group" key={index}>
                            <label htmlFor={`input_${index + 1}`}>{`Input ${index + 1}:`}</label>
                            <input
                                type="text"
                                id={`input_${index + 1}`}
                                value={inputValue}
                                onChange={(e) => handleInputChange(selectedOption, index, e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button><br></br><br></br>
                    <button onClick={handleDownload}>Download JAR</button>
                    {downloadUrl && (
                        <a href={downloadUrl} download="gkc-aws-pipeline-1.0-SNAPSHOT.jar">
                            Click to download
                        </a>
                    )}
                </>
            )}
        </div>
    );
}

export default RedirectPage;
