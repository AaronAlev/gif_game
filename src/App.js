import './styles/app.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onDisconnect, onValue} from 'firebase/database';

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
        })
        setAllPlayersRef(playersArray);
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
                <span class="faded"> (you) </span>
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
            <div>Players in the lobby:</div>
            {allPlayersRef.map((player) => (
              <div key={player.id}>
                {player.name}
                {player.id === playerId && (
                  <span class="faded">(you)</span>
                )}
              </div>
            ))}
          </div>
          <div>Coming soon... and the other little fibs I whisper to my own reflection.</div>
        </div> 
      )}
    </div>
  );
}

export default App;
