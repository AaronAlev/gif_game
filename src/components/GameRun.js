import { sendMessage } from "../scripts/chatInput";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StyledPlayIcon, SendContainer } from '../FontAwesomeIcons';
import SideBar from "./SideBar";
import GifSlot from "./GifSlot";

const GameRun = ({allPlayersRef, playerId, inputRef, database, setMessage, message, setChatActive, username}) => {
    return (
        <div className='game'>
          <SideBar allPlayersRef={allPlayersRef} playerId={playerId} setChatActive={setChatActive}/>
          <div id="board">
            <div>
              <GifSlot />
            </div>
            <form onSubmit={(e) => sendMessage(e, message, inputRef, username, database, setMessage)}>
              <input 
              autoComplete="off"
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