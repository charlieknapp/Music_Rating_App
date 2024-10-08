<?php 
   require __DIR__ . "/inc/bootstrap.php";
   
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:*');
    header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE');
    header('Access-Control-Allow-Credentials: true');

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        exit();
    }

    $uri = explode('/', $uri);
 
    //functions for our users datbase based of the link sent using axois from front-end - creates a controller and calls the method to that controller based of url sent 
    if($uri[6] == 'user') {
        require PROJECT_ROOT_PATH . "/Controller/api/userController.php";
        $objUserController = new UserController();
        $strMethodName = $uri[7] . 'Action';
        $objUserController->{$strMethodName}();
    }
    //functions for our raings datbase based of the link sent using axois from front-end - creates a controller and calls the method to that controller based of url sent 
    if($uri[6] == 'rating') {
        require PROJECT_ROOT_PATH . "/Controller/api/ratingController.php";
        $objRatingController = new RatingController();
        $strMethodName = $uri[7] . 'Action';
        $objRatingController->{$strMethodName}();
    }
    
    
   
