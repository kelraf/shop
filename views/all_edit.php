<?php 
    include_once "./header.php"
    
?>

    <div id="all-edit">

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <stock-mobile-table :sold-edit-only="sold_edit_only" />
                </div>
            </div>
        </div>

    </div>

<?php
    include_once "./footer.php"
?>