<?php
header('Access-Control-Allow-Origin:*');
class RatingController extends BaseController
{
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $ratingModel = new RatingModel();
                //will only display 100 songs
                $intLimit = 100;
                //calls get ratings on the rating model and then encodes it into a json
                $arrRatings = $ratingModel->getRatings($intLimit);
                $responseData = json_encode($arrRatings);
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

    public function deleteAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = json_decode(file_get_contents('php://input'), true);
                //grabs id from the post data 
                $testId = $postData['id'];

                //creates a new ratingModel and deletes the rating with the id that was posted from the ratings table
                $ratingModel = new RatingModel();
                $arrRatings = $ratingModel->deleteRating($testId);
                $responseData = json_encode($arrRatings);
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
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = json_decode(file_get_contents('php://input'), true);
                //grabs data from props to be used in function to add a rating
                $testId = $postData['id'];
                $username = $postData['username'];
                $artist = $postData['artist'];
                $song = $postData['song'];
                $rating = $postData['rating'];

                //checks to make sure the user did not already leave a review on this song
                $ratingModel = new RatingModel();
                $existingSongReview = $ratingModel->checkSongExists($username, $song, $artist);

                //if the user did not already create the rating then they add it to the ratings database if not an error will be returned
                if ($existingSongReview == 0) {
                    $arrRatings = $ratingModel->createRating($username, $artist, $song, $rating);
                    $responseData = json_encode($arrRatings);
                } else {
                    $responseData = json_encode(array('error' => 'Song review already exists, please choose another song.'));
            }

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


    public function editAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $postData = json_decode(file_get_contents('php://input'), true);
                //grabs variables for post to be used in the editRating method
                $testId = $postData['id'];
                $artist = $postData['artist'];
                $song = $postData['song'];
                $rating = $postData['rating'];

                $ratingModel = new RatingModel();
                $arrRatings = $ratingModel->editRating($testId, $song, $artist, $rating);
                $responseData = json_encode($arrRatings);
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
}