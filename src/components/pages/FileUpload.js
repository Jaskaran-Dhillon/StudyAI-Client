import React, { useState, useRef } from 'react';
import UploadImage from '../images/upload_icon.png'; 
import "../FileUpload.css";

function FileUpload() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <div>
    <form id="form-file-upload" onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={false} accept=".pdf" onChange={handleChange} />

      <label id="label-file-upload" htmlFor="input-file-upload">
        <div>
          <img src={UploadImage} alt="Upload"/>
          <p>Click to upload your file here</p>
        </div>
      </label>

      <h3 className="file-name">{selectedFile ? selectedFile.name : "No file chosen"}</h3>

      <div className="select-dropdown">
        <select id="summary-type">
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

      <button className="get-summary-btn">Get Summary</button>
    </form>
  </div>
  );
}

export default FileUpload;
