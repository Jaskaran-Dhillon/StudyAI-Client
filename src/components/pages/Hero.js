import React from "react";
import { useNavigate } from "react-router-dom";

import "../Hero.css";
import HeroImage from '../images/student_learning.png';

const Hero = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {  
      navigate(path);
    };

    return (
        <div className="row">
            <div className="left-column">
                <h2 className="left-heading">Your smart note taking solution</h2>
                <p className="left-paragraph">StudyAI is not just a tool; it's your ally in efficient learning. Elevate your academic experience and focus on understanding, while we handle the notes. </p>
                <button className="get-started-btn" onClick={() => handleNavigate("/login")}>Get Started</button>
            </div>
            <div className="right-column">
                <img src={HeroImage} alt="Student Learning"/>
            </div>
        </div>
    );
}

export default Hero;