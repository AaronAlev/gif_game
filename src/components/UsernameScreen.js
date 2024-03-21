import { handleUsername } from '../scripts/username.js';
import { useState } from 'react';
//import GifSlot from './GifSlot.js';

const UsernameScreen = ({username, playerId, playerRef, setUsernameSet, setUsername, lobbyId, setLobbyId}) => {
    const [tempLobbyId, setTempLobbyId] = useState('');
    return (
        <div>
            <form onSubmit={(e) => handleUsername(e, username, playerId, playerRef, setUsernameSet, lobbyId, setLobbyId, tempLobbyId)} id="set-name">
                <label>Username:</label>
                <input type="text" value={username} autoComplete='off' onChange={(e) => setUsername(e.target.value)}/>
                <label>Enter a lobby id:</label>
                <input type="text" value={tempLobbyId} autoComplete='off' onChange={(e) => setTempLobbyId(e.target.value)}/>
                <button type='submit'>submit</button>
            </form>
            {/*<GifSlot />*/}
        </div>
    )
};

export default UsernameScreen;