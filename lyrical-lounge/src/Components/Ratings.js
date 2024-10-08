import RatingRow from "./RatingRow";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import AddEditRating from './AddEditRating';
import EditRating from "./EditRating";
import { Link, useNavigate } from "react-router-dom";
import Rating from 'react-rating-stars-component';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import myImage from '../magnifier.png'; 



function Ratings({data}){
    //settinf variables that will need to be changed
    const [ratings, setRatings] = useState([]);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    //variables for showing or hiding add and edit
    const [isAddRatingFormVisible, setIsAddRatingFormVisible] = useState(false);
    const [selectedRatingInfo, setSelectedRatingInfo] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const navigate = useNavigate();
    //get current user from local storage
    const currentUser = localStorage.getItem("loggedInUser");

    //posts id to backend to remove the review
    const remove = async (id) => {
      try {
        let res = await axios.post(
          "http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/rating/delete",
          { id: id }
        );
        console.log(id);
        console.log(res.data); // Log the response data
        NotificationManager.success('Rating deleted!');
        fetchRatings();
      } catch (error) {
        console.error('Error deleting rating:', error);
      }
    };
    
    //gets the ratings from the database
    const getListRatings = async () => {
        try {
          const response = await fetch('http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/rating/list');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json(); // Assuming the response is in JSON format
          return data;
        } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow the error to handle it at a higher level
        }
      }
      
    //gets list of ratings and updates the variable for ratings
    const fetchRatings = async () => {
        try {
          const ratings = await getListRatings();
          setRatings(ratings);
          console.log('List of Ratings:', ratings);
          // Now you can use the ratings data in your application
        } catch (error) {
          // Handle errors here
          console.error('Error fetching ratings:', error);
        }
      }
      
    useEffect(() => {
        fetchRatings();
        }, []);

      
      //chat hpt helped with this function
      //dynamic sorting function given what you would to sort by  
      const sortDataBy = (sortType) => {
          const sortedData = [...ratings].sort((a, b) => {
              const artistA = a[sortType].toLowerCase();
              const artistB = b[sortType].toLowerCase();
              if (artistA < artistB) return -1;
              if (artistA > artistB) return 1;
              return 0;
          });
          setRatings(sortedData);
      }
      //function to sort data
      const sortDataByRating = () => {
        const sortedData = [...ratings].sort((a, b) => b.rating - a.rating);
        setRatings(sortedData);
    }

    //function to show the edit form
    const showEditForm = (ratingId,username,artist,song,rating) => {
        setSelectedRatingInfo({
          id: ratingId,
          username: username,
          artist: artist,
          song: song,
          rating: rating
        });
        setIsEditFormVisible(true);
    }

    //function to hide the edit form
    const hideEditForm = () => {
        window.location.reload();
        setIsEditFormVisible(false);
        setSelectedRatingInfo(null);
    }

    //function to hide the add from
    const hideAddForm = () => {
      setIsAddRatingFormVisible(false);
    }
    const currUser = localStorage.getItem("loggedInUser");
    console.log(currUser);
    
    //logout function which removes user from local storage and brings them to login
    const logout = () => {
      localStorage.removeItem("loggedInUser");
      navigate('/');
    }

    //function for rendering the stars 
    const renderStars = (rating) => {
      return (
          <Rating
              count={5}
              value={rating}
              size={24}
              edit={false}
              isHalf={false}
              activeColor="#ffd700"
          />
      );
    }

    const handleViewClick = (rating) => {
      if (selectedRating && selectedRating.id === rating.id) {
          setSelectedRating(null); // Hide the view details if the same rating is clicked again
      } else {
          setSelectedRating(rating);
      }
    }

    return (
      <div className="container" >
        <h1 style={{ textAlign: 'center', color: 'purple', marginBottom: '20px' }}>Lyrical Lounge &#127925;</h1>
        <NotificationContainer />
        <div className="row">
          <div className="col">
            <p>You are logged in as {currentUser}</p>
            <button className="btn btn-primary" onClick={logout}>Logout</button>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username <img onClick={() => sortDataBy('username')} style={{ width: '20px' }} src={myImage} alt="Sort by Username" /></th>
                    <th>Artist <img onClick={() => sortDataBy('artist')} style={{ width: '20px' }} src={myImage} alt="Sort by Artist" /></th>
                    <th>Song <img onClick={() => sortDataBy('song')} style={{ width: '20px' }} src={myImage} alt="Sort by Song" /></th>
                    <th>Rating <img onClick={sortDataByRating} style={{ width: '20px' }} src={myImage} alt="Sort by Rating" /></th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((rating) => (
                    <tr key={rating.id}>
                      <td>{rating.id}</td>
                      <td>{rating.username}</td>
                      <td>{rating.artist}</td>
                      <td>{rating.song}</td>
                      <td>{renderStars(rating.rating)}</td>
                      <td>
                        {rating.username === currentUser && (
                          <button className="btn btn-danger" onClick={() => remove(rating.id)}>Delete</button>
                        )}
                        {rating.username === currentUser && (
                          <button className="btn btn-secondary" onClick={() => showEditForm(rating.id, rating.username, rating.artist, rating.song, rating.rating)}>Edit</button>
                        )}
                        <button className="btn btn-info" onClick={() => handleViewClick(rating)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={() => setIsAddRatingFormVisible(!isAddRatingFormVisible)}>Add Rating</button>
            {isAddRatingFormVisible && <AddEditRating fetchRatings={fetchRatings} hideForm={hideAddForm} />}
            {isEditFormVisible && <EditRating ratingInfo={selectedRatingInfo} fetchRatings={fetchRatings} hideForm={hideEditForm} />}
          </div>
        </div>
        {selectedRating && (
          <div className="view-rating">
            <h3>Rating Details</h3>
            <p>Username: {selectedRating.username}</p>
            <p>Artist: {selectedRating.artist}</p>
            <p>Song: {selectedRating.song}</p>
            <p>Rating:{renderStars(selectedRating.rating)}</p>
          </div>
        )}
      </div>
    );
    
}

export default Ratings;