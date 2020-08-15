<?php 

    require_once "../../models/stock_mobile.php";
    require_once "../../config/db.php";

    require_once "../../config/config.php";

    $db_inst = new Database( $config["db"]);

    $stock_mobile = new stockMobile($db_inst);

    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $done = $stock_mobile->getData();

    echo json_encode($done);

?>