import './styles/app.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onDisconnect, onValue} from 'firebase/database';
import UsernameScreen from './components/UsernameScreen';
import PreGame from './components/PreGame';
import GameRun from './components/GameRun';

function App() {
  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerRef, setPlayerRef] = useState(null);
  const [usernameSet, setUsernameSet] = useState(false);
  const [allPlayersRef, setAllPlayersRef] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [message, setMessage] = useState('');

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


  const inputRef = React.createRef();
  return (
    <div>
      {!usernameSet &&(
        <UsernameScreen 
        username={username}
        playerId={playerId}
        playerRef={playerRef} 
        setUsername={setUsername} 
        setUsernameSet={setUsernameSet}
        />
      )}
      {usernameSet && !gameState &&(
        <PreGame
        allPlayersRef={allPlayersRef}
        playerId={playerId}
        gameStart={gameStart}
        />
      )}
      {gameState && usernameSet &&(
        <GameRun
          allPlayersRef={allPlayersRef}
          playerId={playerId}
          inputRef={inputRef}
          database={database}
          setMessage={setMessage}
          message={message}
        />
      )}
    </div>
  );
}

export default App;
