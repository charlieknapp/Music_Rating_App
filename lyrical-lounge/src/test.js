import React from 'react';
import axios from 'axios';

let username = 'brad';
let password = 'brad23'


const submit = async() => {
    let res = await axios.post("http://localhost/Music-Rating-App/lyrical-lounge/backEnd/src/index.php/user/create", {
    username,
    password 
    });
} ;


function YourComponent() {
    return (
      <div>
        <p>hello dr beef</p>
        <button onClick={submit}>Submit</button>
      </div>
    );
  }
  
export default YourComponent;

