import { sendMessage } from "../scripts/chat";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StyledPlayIcon, SendContainer } from '../FontAwesomeIcons';

const GameRun = ({allPlayersRef, playerId, inputRef, database, setMessage, message}) => {
    return (
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
            <form onSubmit={(e) => sendMessage(e, message, inputRef, playerId, database, setMessage)}>
              <input 
              ref={inputRef}
              type="text" 
              id="chat-input" 
              onChange={(e) => setMessage(e.target.value)}
              />
              <SendContainer type="submit"><StyledPlayIcon icon={faPlay}/></SendContainer>
            </form>
          </div>

        </div> 
    );
};

export default GameRun;