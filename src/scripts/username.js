import { set } from 'firebase/database';

const handleUsername = (event, username, playerId, playerRef, setUsernameSet, lobbyId, setLobbyId, tempLobbyId) => {
    event.preventDefault();
    if (tempLobbyId.trim !== '') {
      setLobbyId('tempLobbyId');
    }

    if (username.trim() !== '') {
      console.log(username, lobbyId, "asdasdadsasdasd");
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