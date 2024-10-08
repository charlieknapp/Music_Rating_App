<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
    class UserModel extends Database
    {   
        // Function to pull users from table
        public function getUsers($limit)
    {
        return $this->select("SELECT * FROM users LIMIT ?", ["i", $limit]);
    }
        // Function to create new user in table
        public function createUsers($userData)
    {
        $username = $userData['username'];
        $password = $userData['password'];

        // Hash the password
        $pass_hash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $this->connection->prepare($sql);
    
        // Bind the parameters
        $stmt->bind_param("ss", $username, $pass_hash);

        // Execute the statement
        $stmt->execute();

    }
        // Function to check if username has already been taken
        public function checkUsername($username)
    {
        $sql = "SELECT * FROM users WHERE username = ?";
        $stmt = $this->connection->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();
        $numRows = $stmt->num_rows;
        $stmt->close();
        return $numRows;
    }
        // Function to login user
        public function loginUser($userData)
        {
            $username = $userData['username'];
            $password = $userData['password'];
        
            $sql = "SELECT * FROM users WHERE username = ?";
            $stmt = $this->connection->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
        
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $stmt->close();
        
                if (password_verify($password, $user['password'])) {
                    return true; // Successful login
                }
            }
        
            return false; // Invalid username or password
        }
        
}
?>