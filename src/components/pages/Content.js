import React from "react";

import "../Content.css";
import NotesImage from '../images/notes.png'; 
import ConceptsImage from '../images/concepts.png'; 

const Content = () => {
    return (
        <div>
            <div className="header">
                <h1 className="header-title">Explore StudyAI Features</h1>
                <h2 className="header-text">Streamline your study material with StudyAI's PDF Summarization. Turn lengthy documents into bite-sized, focused notes for efficient learning.</h2>
            </div>
            <div className="content-row">
                <div className="content-left-column">
                    <img src={NotesImage} alt="Notes"/>
                    <h2 className="content-heading">Summarized Notes</h2>
                    <p className="content-paragraph">StudyAI's summarized notes distill detailed content into concise, focused insights, enriching your learning experience.</p>
                </div>
                <div className="content-right-column">
                    <img src={ConceptsImage} alt="Concepts"/>
                    <h2 className="content-heading">Key Concepts</h2>
                    <p className="content-paragraph">Each summary highlights key concepts that develop the core ideas, helping you retain crucial information efficiently.</p>               
                </div>
            </div>
        </div>
    );
}

export default Content;