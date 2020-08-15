<?php 

    class Database {

        private $host;
        private $username;
        private $dbname;
        private $password;

        private $conn = null;

        public function __construct($db_config) {

            $this->host = $db_config["host"];
            $this->username = $db_config["username"];
            $this->dbname = $db_config["dbname"];
            $this->password = $db_config["password"];

            try {
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname;", $this->username);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // echo "Successfull Database conn \n";
            } catch(PDOException $ex) {
                echo "Error: {$ex->getMessage()}";
            }
        }

        public function getConn() {
            return $this->conn;
        }

        public function closeConn() {
            $this->conn = null;
        }

    }

    // $db = new Database;
    // $db->getConn();
    // $db->closeConn();

?>