import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {

    return (
        <div className="home-text">
            <div className="same-line"> 
                <FontAwesomeIcon className="home-page-icon" icon={faPaw}/>  
                <h1 className="title-font">Parks for Paws</h1>
                <FontAwesomeIcon className="home-page-icon" icon={faPaw}/>
            </div> 
            <p>Find, visit and review local dog parks.</p>
            <img className="image-size" src="https://dog-parks-production.s3.amazonaws.com/IMG_1303.jpg"/> 
            <div className="home-page-footer-text">   
                <p>Youk enjoying his favorite park!</p>
                <p>Application by: Alex Nunan, Hilary Gould, Kriss Strikis, & Scrith Prosper</p>
            </div>
        </div>
    )
}

export default Home