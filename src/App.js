import './styles/app.css';
import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onDisconnect, onValue} from 'firebase/database';
import UsernameScreen from './components/UsernameScreen';
import PreGame from './components/PreGame';
import GameRun from './components/GameRun';
import Chat from './components/Chat';

function App() {
  const [username, setUsername] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerRef, setPlayerRef] = useState(null);
  const [usernameSet, setUsernameSet] = useState(false);
  const [allPlayersRef, setAllPlayersRef] = useState([]);
  const [allMessagesRef, setAllMessagesRef] = useState([]);
  const [gameState, setGameState] = useState(false);
  const [message, setMessage] = useState('');
  const [chatActive, setChatActive] = useState(true);
  const [lobbyId, setLobbyId] = useState('');

  const inputRef = React.createRef();
  const auth = getAuth();
  const database = getDatabase();

  useEffect(() => { // Sets the player id and reference
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPlayerId(user.uid);
        const playerReference = ref(database, `gugugaga/players/${user.uid}`);
        setPlayerRef(playerReference);
        onDisconnect(playerReference).remove();
      } else {
        // No user is signed in.
      }
    });

    return () => unsubscribe();
  }, [auth, database, lobbyId]);

  useEffect(() => { // Reads the game state from the database
    const gameStateRef = ref(database, `${lobbyId}/gameState`);
    const unsubscribe = onValue(gameStateRef, (snapshot) => {
      const gameState = snapshot.val();
      setGameState(gameState);
    });
    return () => unsubscribe();
  }, [database, lobbyId]);

  const gameStart = () => { // Starts the game
    console.log('game start');
    set(ref(database, `${lobbyId}/gameState`), true);
  };

  useEffect(() => { // Signs the user in anonymously
    signInAnonymously(auth).catch((error) => {
      console.log(error);
    });
  }, [auth]);

  useEffect(() => { // Reads all players from the database
    const allPlayersRef = ref(database, `${lobbyId}/players`);

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
        set(ref(database, `${lobbyId}/gameState`), false);
      }
    })
    return () => unsubscribe();
  }, [database, lobbyId]);

  useEffect(() => { // Reads all messages from the chat
    const chatRef = ref(database, `${lobbyId}/chat`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const chatData = snapshot.val();
      if (chatData) {
        const messageArray = Object.entries(chatData).map(([id, data]) => {
          return {
            sender: data.sender,
            message: data.message,
            time: data.time
          };
        });
        setAllMessagesRef(messageArray);
      }
    });

    return () => unsubscribe();
  }, [database, lobbyId]);

  return (
    <div>
      {!usernameSet &&(
        <UsernameScreen 
        username={username}
        playerId={playerId}
        playerRef={playerRef}
        setUsernameSet={setUsernameSet}
        setUsername={setUsername}
        lobbyId={lobbyId}
        setLobbyId={setLobbyId}
        />
      )}
      {usernameSet && !gameState &&(
        <PreGame
        allPlayersRef={allPlayersRef}
        playerId={playerId}
        gameStart={gameStart}
        />
      )}
      {gameState && usernameSet && chatActive === false &&(
        <GameRun
          allPlayersRef={allPlayersRef}
          playerId={playerId}
          inputRef={inputRef}
          database={database}
          setMessage={setMessage}
          message={message}
          setChatActive={setChatActive}
          username={username}
        />
      )}
      {chatActive === true && gameState && usernameSet &&(
        <Chat
          allPlayersRef={allPlayersRef}
          playerId={playerId}
          setChatActive={setChatActive}
          allMessagesRef={allMessagesRef}
          setMessage={setMessage}
          message={message}
          username={username}
          inputRef={inputRef}
          database={database}
        />
      )}
    </div>
  );
}

export default App;
