import { handleUsername } from '../scripts/username.js';

const UsernameScreen = ({username, playerId, playerRef, setUsernameSet, setUsername}) => {
    return (
        <div>
            <form onSubmit={(e) => handleUsername(e, username, playerId, playerRef, setUsernameSet)} id="set-name">
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
};

export default UsernameScreen;