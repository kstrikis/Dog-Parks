import React from "react";

const ReviewTile = ({ id, reviewText, rating, imageUrl, userName, userId, currentUser, isAdmin, handleOnClickDeleteReview }) => {
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
    let imageSection
    if (imageUrl) {
        imageSection = <img src={imageUrl}/>
    }

    return (
        <div className="review-callout callout">
            <h4 className="review-tile-header">{userName}'s Review</h4>
            <p className="review-tile-text">{reviewText}</p>
            <p className="review-tile-text">Rating: {rating}</p>
            <p>{imageSection}</p>
            {deleteButton}
        </div>
    )
}

export default ReviewTile