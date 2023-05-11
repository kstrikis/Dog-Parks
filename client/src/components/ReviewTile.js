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
                className="button"
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
        <>
            <h4>{userTitle}</h4>
            <p>{reviewText}</p>
            <p>Rating: {rating}</p>
            {deleteButton}
        </>
    )
}

export default ReviewTile