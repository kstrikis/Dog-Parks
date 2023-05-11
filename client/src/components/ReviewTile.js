import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";

const ReviewTile = ({ id, reviewText, rating, userName, userId, currentUser, isAdmin, handleOnClickDeleteReview }) => {
    let currentUserId = null
    if (currentUser) {
        currentUserId = currentUser.id
    }
    let deleteButton = ""
    if (isAdmin || currentUserId === userId) {
        deleteButton =
            <button
                className="delete-button-dark"
                onClick={(event) => {
                handleOnClickDeleteReview(event, id)}}>
                    Delete review
            </button>
    }

    const checkedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={solidStar} />
    const uncheckedIcon = <FontAwesomeIcon className="right-margin-smaller" icon={thinStar} />

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

    let userTitle =`${userName}'s Review`
    if (userName === "Review From Google Maps") {
        userTitle = "Google Review"
    }

    return (
        <div className="review-callout callout right-margin left-margin">
            <h4 className="review-tile-header">{userTitle}</h4>
            <p className="review-tile-text">{reviewText}</p>
            <p className="review-tile-text">Rating: {getRating(rating)}</p>
            {deleteButton}
        </div>
    )
}

export default ReviewTile