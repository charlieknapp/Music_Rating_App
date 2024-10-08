import React, {useState} from "react";
import axios from "axios";
import ReactStars from 'react-rating-stars-component';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function EditRating(props){  
    //function called with props which include artist, song, rating, and rating id
    console.log(props);
    console.log(props.ratingInfo['artist']);
    //setting variables from props
    const [artist, setArtist] = useState(props.ratingInfo['artist']);
    const [song, setSong] = useState(props.ratingInfo['song']);
    const [rating, setRating] = useState(props.ratingInfo['rating']);

    //on submit chat gpt helped us with this
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await edit(artist, song, rating);
        } catch (error) {
          console.error('Error adding rating:', error);
        }
        
      };
      
      //call to backend with posted data 
      const edit = async (artist, song, rating) => {
        try {
            console.log('about to request');
            console.log(artist, song, rating);
            let res = await axios.post("http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/rating/edit",
            { id: props.ratingInfo['id'], artist: artist, song: song, rating: rating }
          );
          console.log(res);
          console.log('from edit:',rating);
          //re render the ratings
          props.fetchRatings();
          //hide teh edit form
          props.hideForm();
          
        } catch (error) {
          console.error('Error adding rating:', error);
          throw error;
        }
      };
    

    return (
    //html for the edit form
      <form onSubmit={handleSubmit} method="POST" className="mt-4">
    <div className="container">
    <NotificationContainer/>
    </div>
      <div className="mb-3">
          <label htmlFor="artist" className="form-label">Artist</label>
          <input
              type="text"
              id="artist"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="form-control"
              required
          />
      </div>
      <div className="mb-3">
          <label htmlFor="song" className="form-label">Song</label>
          <input
              type="text"
              id="song"
              name="song"
              value={song}
              onChange={(e) => setSong(e.target.value)}
              className="form-control"
              required
          />
      </div>
      <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
              onChange={newValue => {
                setRating(newValue);
              }
            }
          />
      </div>
      <div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button style={{ backgroundColor: 'red' }} className="btn btn-primary" onClick={props.hideForm}>Cancel</button>
        </div>
  </form>
    );
  }
  
export default EditRating;