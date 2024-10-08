import React from "react";
//un used code, this can be disregarded

function RatingRow ({id, username, artist, song, rating}) {
    return <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{artist}</td>
            <td>{song}</td>
            <td>{rating}</td>
        </tr>;
}

export default RatingRow;