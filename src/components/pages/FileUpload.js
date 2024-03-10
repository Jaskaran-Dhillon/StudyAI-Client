import React, { useState, useRef } from 'react';
import { aiService } from 'services/ai.service';
import UploadImage from '../images/upload_icon.png'; 
import DeleteIcon from '@mui/icons-material/Delete';
import PdfIcon from '@mui/icons-material/PictureAsPdfRounded';
import AudioIcon from '@mui/icons-material/AudioFileRounded';
import VideoIcon from '@mui/icons-material/VideoFile';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../FileUpload.css";

function fileSize(sizeInBytes) {
  const kbSize = sizeInBytes / 1024;
  if (kbSize < 1024) {
    return kbSize.toFixed(2) + ' KB';
  } else {
    const mbSize = kbSize / 1024;
    return mbSize.toFixed(2) + ' MB';
  }
}

function getFileTypeIcon(fileType) {
  switch (fileType) {
    case 'pdf':
      return <PdfIcon style={{marginRight: "2rem", fontSize: 40 }}  alt="PDFIcon"/>;
    case 'mp3':
      return <AudioIcon style={{marginRight: "2rem", fontSize: 40 }}  alt="AudioIcon"/>;
    case 'mp4':
      return <VideoIcon style={{marginRight: "2rem", fontSize: 40 }}  alt="VideoIcon"/>;
    default:
      return null;
  }
}

function FileUpload() {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [summarySelected, setSummary] = useState(true);   // Summary option set to toggled
  const [bulletSelected, setBullet] = useState(false);
  const [keywordSelected, setKeyword] = useState(false);

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // if (file && (file.type === 'application/pdf' || file.type === 'audio/mpeg')) {
      //   setSelectedFile(file);
      // } else{
      //   setSelectedFile(null);
      //   toast.error("Invalid file type, please select a PDF.")
      // }

      if (file) {
        setSelectedFile(file);
      } else{
        setSelectedFile(null);
        toast.error("Invalid file type, please select a PDF.")
      }
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    // Clear the file input value if the delete icon is clicked
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleOptionChange = (option) => {
    switch (option) {
      case 'summary':
        // Only if bullet or keyword is selected summary can be untoggled
        if (!bulletSelected && !keywordSelected) {
          setSummary(true);
        } else {
          setSummary(!summarySelected);
        }
        break;
      case 'bullet':
        setBullet(!bulletSelected);
        if (!summarySelected && !keywordSelected) {
          setSummary(true);
        }
        break;
      case 'keyword':
        setKeyword(!keywordSelected);
        if (!summarySelected && !bulletSelected) {
          setSummary(true);
        }
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Currently just for sending PDFs and MP3 file
    let fileType;
    if (selectedFile.type === 'application/pdf') {
      fileType = "pdf";
    } else if (selectedFile.type === 'audio/mpeg') {
      fileType = "audio";
    }

    // const data = {
    //   file: selectedFile
    // }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileType", fileType);
      formData.append("verbosity", document.getElementById("summary-type").value); // 0-short, 1-medium, 2-long
      formData.append("summary", summarySelected);
      formData.append("bullet", bulletSelected);
      formData.append("keyWord", keywordSelected);

      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]); 
      // }

      const result = await aiService.summarize(formData);
      console.log(result);
      //console.log(JSON.parse(result.data.data));
    } catch (e){
      console.error(e);
    }
  };

  return (
    <div>
    <form id="form-file-upload" onSubmit={handleSubmit}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />

      <label id="label-file-upload" htmlFor="input-file-upload">
        <div>
          <img src={UploadImage} alt="Upload"/>
          <p>Click to upload your file here</p>
        </div>
      </label>

      <div className="file-name-container">
        {/* Show the file type icon */}
        {selectedFile && getFileTypeIcon(selectedFile.name.split('.').pop().toLowerCase())}
        
        <h3 className="file-name">{selectedFile ? `${selectedFile.name} (${fileSize(selectedFile.size)})` : "No file chosen"}</h3>

        {/* Delete icon to choose another file */}
        {selectedFile && (
          <DeleteIcon
            className="delete-icon"
            onClick={handleDelete}
            style={{ cursor: "pointer", marginLeft: "2rem"}}
          />
        )}
      </div>

      {/* Verbosity dropdown */}
      <div className="select-dropdown">
        <select id="summary-type">
          <option value='0'>Short</option>
          <option value='1'>Medium</option>
          <option value='2'>Long</option>
        </select>
      </div>

      {/* Notes type option (summary is toggled from default) */}
      <div className="option-selector">
        <label className="options">
          <input
            type="checkbox"
            checked={summarySelected}
            onChange={() => handleOptionChange("summary")}
          />
          Summary
        </label>

        <label className="options">
          <input
            type="checkbox"
            checked={bulletSelected}
            onChange={() => handleOptionChange("bullet")}
          />
          Bullet Points
        </label>
        
        <label className="options">
          <input
            type="checkbox"
            checked={keywordSelected}
            onChange={() => handleOptionChange("keyword")}
          />
          Keywords
        </label>
      </div>

      <button className="get-summary-btn" disabled={!selectedFile} onClick={handleSubmit}>Get Summary</button>
    </form>
  </div>
  );
}

export default FileUpload;
