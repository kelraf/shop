<?php 

    include_once "./views/header.php";

    require_once "./config/config.php";

    $host = $config["project"]["host"];

?>


    <div class="container pt-5 mt-5">

        <div class="row mt-5">
            <div class="col-12">
                <h2 class="text-danger text-center">
                    STORE MOBILE
                </h2>
            </div>
        </div>

        <div class="row mt-5 text-center">

            <div class="col-md-6">
               <a href="<?php echo $host ?>views/all_edit.php" class="btn btn-outline-success">
                   OTHER TABLE
                </a>
            </div>

            <div class="col-md-6">
                <a href="<?php echo $host ?>views/sold_edit_only.php" class="btn btn-outline-success">
                    SOLD COLUMN ONLY EDITABLE TABLE
                </a>
            </div>

        </div>  

        <div class="row mt-5">
            <div class="col-12">
                <h2 class="text-danger text-center">
                    PROJECT SETUP
                </h2>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <h4 class="text-center">
                    PHP
                </h4>
                <p class="lead">
                    Head Over To Project Root Folder Then config folder and configure DataBase And Host Params config.php

                    The Available/Default Configs Are <code> <?php
                        print_r($config)
                    ?> </code>

                </p>
            </div>

            <div class="col-md-6">
                <h4 class="text-center">
                    JAVASCRIPT
                </h4>
                <p class="lead">
                    Head Over To Project Root Folder Then config folder and configure Host Params in config.js
                </p>
            </div>

        </div>

    </div>


<?php
    include_once "./views/footer.php"
?>