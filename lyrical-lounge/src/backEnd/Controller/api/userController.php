<?php
class UserController extends BaseController
{
    //function to list users, not actually used
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getUsers($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function createAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $postData = json_decode(file_get_contents('php://input'), true);

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $existingUser = $userModel->checkUsername($postData['username']);

                //checks to see if user exist 
                if ($existingUser == 0) {
                    //checks to see if password and password confirmation are the same
                    if ($postData['password'] == $postData['confirm_password']) {
                        //add the user to the users table
                        $userModel->createUsers($postData);
                        $responseData = json_encode(array('message' => 'User created successfully'));
                    } else {
                        $responseData = json_encode(array('error' => 'Password and confirm password must match'));
                    }
                } else {
                    $responseData = json_encode(array('error' => 'Username already exists. Please choose a different username.'));
                }
            } catch (Exception $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        if (!$strErrorDesc) {
            // Send a successful response
            $this->sendOutput($responseData, array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
        } else {
            // Send an error response
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), array('Content-Type: application/json', $strErrorHeader));
        }
    }


    public function loginAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $postData = json_decode(file_get_contents('php://input'), true);
        
        if (strtoupper($requestMethod) == 'POST') {
            try {
                //new model to call login method
                $userModel = new UserModel();
                $loggedIn = $userModel->loginUser($postData);
                
                //checks to see is login was successful or not
                if ($loggedIn) {
                    $responseData = json_encode(array('message' => 'User logged in successfully'));
                } else {
                    // Invalid username or password
                    $responseData = json_encode(array('error' => 'Invalid username or password'));
                }
            } catch (Exception $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
    
        if (!$strErrorDesc) {
            $this->sendOutput($responseData, array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), array('Content-Type: application/json', $strErrorHeader));
        }
    }
    
    }