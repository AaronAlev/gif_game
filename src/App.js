import './styles/app.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onDisconnect, onValue} from 'firebase/database';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StyledPlayIcon, SendContainer } from './FontAwesomeIcons';

function App() {
  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerRef, setPlayerRef] = useState(null);
  const [usernameSet, setUsernameSet] = useState(false);
  const [allPlayersRef, setAllPlayersRef] = useState([]);
  const [gameState, setGameState] = useState(false);

  const auth = getAuth();
  const database = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPlayerId(user.uid);
        const playerReference = ref(database, `players/${user.uid}`);
        setPlayerRef(playerReference);
        onDisconnect(playerReference).remove();
      } else {
        // No user is signed in.
      }
    });

    return () => unsubscribe();
  }, [auth, database]);

  const handleUsername = (event) => {
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

  useEffect(() => {
    const gameStateRef = ref(database, 'gameState');
    const unsubscribe = onValue(gameStateRef, (snapshot) => {
      const gameState = snapshot.val();
      setGameState(gameState);
    });
    return () => unsubscribe();
  }, [database]);

  const gameStart = () => {
    console.log('game start');
    set(ref(database, 'gameState'), true);
  };

  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.log(error);
    });
  }, [auth]);

  useEffect(() => {
    const allPlayersRef = ref(database, 'players');

    const unsubscribe = onValue(allPlayersRef, (snapshot) => {
      const playersData = snapshot.val();
      if (playersData) {
        const playersArray = Object.entries(playersData).map(([id, data]) => {
          return {
            id,
            name: data.name,
            score: data.score,
            leader: data.leader
          };
        });
        setAllPlayersRef(playersArray);
      } else {
        set(ref(database, 'gameState'), false);
      }
    })
    return () => unsubscribe();
  }, [database]);

  return (
    <div>
      {!usernameSet &&(
        <div>
          <form onSubmit={handleUsername} id="set-name">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <button type='submit'>submit</button>
          </form>
        </div>
      )}
      {usernameSet && !gameState &&(
        <div className='game'>
        <div id="players">
          <div>Players in the lobby:</div>
          {allPlayersRef.map((player) => (
            <div key={player.id}>
              {player.name}
              {player.id === playerId && (
                <span className="faded"> (you) </span>
              )}
              </div>
          ))}
        </div>
        <div className="start-game">
          <form onSubmit={gameStart} id='start-game'>
            <button type="submit" id='start-game'>Start Game</button>
          </form>
        </div>
      </div>
      )}
      {gameState && usernameSet &&(
        <div className='game'>
          <div id="players">
            <div><p>Players in the lobby:</p></div>
            {allPlayersRef.map((player) => (
              <div key={player.id}>
                {player.name}
                {player.id === playerId && (
                  <span class="faded">(you)</span>
                )}
              </div>
            ))}
          </div>
          <div id="board">
            <div>Game board goes here</div>
            <form>
              <input type="text" id="chat-input" />
              <SendContainer type="submit"><StyledPlayIcon icon={faPlay}/></SendContainer>
            </form>
          </div>

        </div> 
      )}
    </div>
  );
}

export default App;
