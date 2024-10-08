<?php
//pathes to later be use and requiring the models
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include main configuration file 
require_once PROJECT_ROOT_PATH . "/inc/config.php";
// include the base controller file 
require_once PROJECT_ROOT_PATH . "/Controller/api/baseController.php";
// include the use model file 
require_once PROJECT_ROOT_PATH . "/Model/userModel.php";
// include the rating model file
require_once PROJECT_ROOT_PATH . "/Model/ratingModel.php";
?>