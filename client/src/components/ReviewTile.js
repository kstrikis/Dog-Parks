import React from "react";

const ReviewTile = ({ reviewText, userName, rating }) => {
    return (
        <>
            <h4>{userName}'s Review</h4>
            <p>{reviewText}</p>
            <p>Rating: {rating}</p>
        </>
    )
}

export default ReviewTile