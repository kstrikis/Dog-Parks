import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {

    return (
        <div>
            <div className="home-text">   
                <h1> 
                    <FontAwesomeIcon className="right-margin" icon={faPaw}/>
                    Parks for Paws
                    <FontAwesomeIcon className="left-margin" icon={faPaw}/>
                </h1>
                <p>Find, visit and review local dog parks.</p>
            </div> 
        </div>
    )
}

export default Home