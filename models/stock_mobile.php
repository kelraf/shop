<?php 

    // require_once "../config/db.php";

    class stockMobile {

        public $id;
        public $store_owner;
        public $product;
        public $quantity_available;
        public $sold;
        public $date;
        public $clear_status;

        public $table = "stock_mobile";

        private $db_inst;

        public function __construct($db_inst) {
            $this->db_inst = $db_inst;
            $this->conn = $this->db_inst->getConn();
        }

        public function __destruct() {
            $this->conn = null;
            $this->db_inst->closeConn();
        }

        public function getData() {
            
            $stmt = "SELECT * FROM $this->table";
            $sql = $this->conn->prepare($stmt);
            $sql->execute();
            $data = $sql->fetchAll();
            
            if($data) {
                return ["bool" => true, "data" => $data];
            } else {
                return ["bool" => false, "message" => "You Do Not Have Data Yet"];
            }

        } 

        public function update() {

            if(!isset($this->id)) {
                return [
                    "bool" => false,
                    "message" => "Please Provide An Id"
                ];
            } else {
                $vdata = $this->vData();
                if(!$vdata["bool"]) {
                    return $vdata;
                } else {
                    $stmt = "UPDATE $this->table SET store_owner=?, product=?, quantity_available=?, sold=?, date=?, clear_status=? WHERE id=?";
                    $sql = $this->conn->prepare($stmt);
                    if($sql->execute([$this->store_owner, $this->product, $this->quantity_available, $this->sold, $this->date, $this->clear_status, $this->id])) {
                        return ["bool" => true, "message" => "Successfully Updated"];
                    } else {
                        return ["bool" => false, "message" => "Unable To Update"];
                    }
                }
            }
        }

        public function deleteData() {
            if(!isset($this->id)) {
                return [
                    "bool" => false,
                    "message" => "Please Provide An Id"
                ];
            } else {
                $stmt = "DELETE FROM $this->table WHERE id=?";
                $sql = $this->conn->prepare($stmt);
                if($sql->execute([$this->id])) {
                    return ["bool" => true, "message" => "Successfully Deleted One Stock Mobile"];
                } else {
                    return ["bool" => false, "message" => "Unable To Delete"];
                }
            }
        }

        private function vData() {
            if(!isset($this->store_owner)) {
                return [
                    "bool" => false,
                    "message" => "Store Owner is Required"
                ];
            } elseif (!isset($this->product)) {
                return [
                    "bool" => false,
                    "message" => "Product is Required"
                ];
            } elseif (!isset($this->quantity_available)) {
                return [
                    "bool" => false,
                    "message" => "Quantity available is Required"
                ];
            } elseif (!isset($this->sold)) {
                return [
                    "bool" => false,
                    "message" => "Sold is Required"
                ];
            } elseif (!isset($this->date)) {
                return [
                    "bool" => false,
                    "message" => "Date is Required"
                ];
            } elseif (!isset($this->clear_status)) {
                return [
                    "bool" => false,
                    "message" => "Clear status is Required"
                ];
            } else {
                return [
                    "bool" => true
                ];
            }
        }

    }

    // $db_inst = new Database();
    // $stockMobile = new stockMobile($db_inst);

    // print_r($stockMobile->getData());
    // $stockMobile->id = 12;
    // print_r($stockMobile->deleteData());