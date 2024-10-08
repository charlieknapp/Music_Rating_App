import React, {useState} from "react";
import axios from "axios";
import ReactStars from 'react-rating-stars-component';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function AddEditRating(props){  
    //variables that will need to be changed
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState('');
    //grabs current user from local storage
    const user = localStorage.getItem("loggedInUser");

    //upon submission this function is ran chat gpt helped out with form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await add(user, artist, song, rating);
        } catch (error) {
          console.error('Error adding rating:', error);
        }
        
      };
    
      //call to beckend and sends the song rating artist that was filled out in the form and the user form local storage
      const add = async (user, artist, song, rating) => {
        try {
            console.log(user, artist, song, rating);
            let res = await axios.post("http://localhost/Music-Rating-App/lyrical-lounge/src/backEnd/index.php/rating/create",
            { artist: artist, username: user, song: song, rating: rating });
            if (res.data && res.data.error === 'Song review already exists, please choose another song.') 
            {
              NotificationManager.error('Song review already exists, please choose another song.');
            } else {
              //notification for successful addition of a rating
              NotificationManager.success('Rating added!',"",2000);
            console.log(res);
            // re render ratings
            props.fetchRatings();
            // hides the form after adding the rating
            props.hideForm();
            }

        } catch (error) {
          console.error('Error adding rating:', error);
          throw error;
        }
      };
    

    return (
      // form for adding a rating 
<form onSubmit={handleSubmit} method="POST" className="mt-4">
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
    <div className="container">
    <NotificationContainer/>
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
            onChange={newValue => setRating(newValue)}
        />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
    <button style={{ backgroundColor: 'red' }} className="btn btn-primary" onClick={props.hideForm}>Cancel</button>
</form>
    );
  }
  
export default AddEditRating;