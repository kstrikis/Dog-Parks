import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {

    return (
        <div className="home-text">
            <div className="same-line"> 
                <FontAwesomeIcon className="home-page-icon" icon={faPaw}/>  
                <h1>Parks for Paws</h1>
                <FontAwesomeIcon className="home-page-icon" icon={faPaw}/>
            </div> 
            <p>Find, visit and review local dog parks.</p>
            <img src="s3://dog-parks-production/IMG_1303.jpg"/> 
        </div>
    )
}

export default Home