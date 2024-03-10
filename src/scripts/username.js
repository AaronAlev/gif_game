import {set } from 'firebase/database';

const handleUsername = (event, username, playerId, playerRef, setUsernameSet) => {
    event.preventDefault();

    if (username.trim() !== '') {
      set(playerRef, {
        id: playerId,
        name: username,
        leader: false,
        score: 0
      });
      setUsernameSet(true);
    }
  };

  export { handleUsername };