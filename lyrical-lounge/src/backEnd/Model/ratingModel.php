<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
    class RatingModel extends Database 
    {   
        // SQl code to apply different operations on rating table
        public function getRatings($limit)
        {
            return $this->select("SELECT * FROM ratings ORDER BY song ASC LIMIT ?", ["i", $limit]);
        }
        public function checkSongExists($username, $song, $artist)
        {
            $sql = "SELECT * FROM ratings WHERE username = ? AND song = ? AND artist = ?";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sss", $username, $song, $artist);
            $stmt->execute();
            $stmt->store_result();
            $numRows = $stmt->num_rows;
            $stmt->close();
            return $numRows;
            
        }
        public function createRating($username, $artist, $song, $rating)
        {
            $sql = "INSERT INTO ratings (username, artist, song, rating) VALUES (?, ?, ?, ? )";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("sssi", $username, $artist, $song, $rating);
            $stmt->execute();

        }
        public function deleteRating($ratingId)
        {
            $sql = "DELETE FROM `ratings` WHERE id = ?";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("i", $ratingId);
            $stmt->execute();
        }
        public function editRating($ratingId, $song, $artist, $rating)
        {
            $sql = "UPDATE `ratings` SET `song`=?, `artist`=?, `rating`=? WHERE id = ?";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("ssii", $song, $artist, $rating, $ratingId);
            $stmt->execute();                
            }
}
?>