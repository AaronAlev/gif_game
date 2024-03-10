import { sendMessage } from "../scripts/chat";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StyledPlayIcon, SendContainer } from '../FontAwesomeIcons';
import SideBar from "./SideBar";

const GameRun = ({allPlayersRef, playerId, inputRef, database, setMessage, message, setChatActive}) => {
    return (
        <div className='game'>
          <SideBar allPlayersRef={allPlayersRef} playerId={playerId} setChatActive={setChatActive}/>
          <div id="board">
            <div>
              Game board goes here
            </div>
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