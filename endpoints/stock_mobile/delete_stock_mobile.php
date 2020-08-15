<?php

    require_once "../../models/stock_mobile.php";
    require_once "../../config/db.php";

    require_once "../../config/config.php";

    $db_inst = new Database( $config["db"]);

    $stock_mobile = new stockMobile($db_inst);

    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $data = json_decode(file_get_contents("php://input"), true);

    $stock_mobile->id = $data["id"];

    $done = $stock_mobile->deleteData();

    echo json_encode(["done" => $done, "data" => $data]);

?>