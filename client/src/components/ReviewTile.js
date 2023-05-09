import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";


const ReviewTile = ({ reviewText, userName, rating }) => {

    const checkedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={faPawSolid} />
    const uncheckedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={faPawRegular} />

    let iconRatingArray = []
    const getRating = (rating) => {
        for(let i = 1; i<=5; i++){
            if(i<=rating){
                iconRatingArray.push(checkedIcon)
            } else {
                iconRatingArray.push(uncheckedIcon)
            }
        }
        return iconRatingArray
    }

    return (
        <>
            <h4>{userName}'s Review</h4>
            <p>{reviewText}</p>
            <p>Rating: {getRating(rating)}</p>
        </>
    )
}

export default ReviewTile