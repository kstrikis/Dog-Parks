import React from "react";

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

    let userTitle =`${userName}'s Review`
    if (userName === "Review From Google Maps") {
        userTitle = "Google Review"
    }

    return (
        <div className="review-callout callout">
            <h4 className="review-tile-header">{userTitle}</h4>
            <p className="review-tile-text">{reviewText}</p>
            <p className="review-tile-text">Rating: {rating}</p>
            {deleteButton}
        </div>
    )
}

export default ReviewTile