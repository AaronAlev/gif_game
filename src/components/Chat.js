import { sendMessage } from "../scripts/chatInput";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { StyledPlayIcon, SendContainer } from '../FontAwesomeIcons';
import SideBar from "./SideBar";

const Chat = ({allPlayersRef, playerId, setChatActive, allMessagesRef, setMessage, message, username, inputRef, database}) => {
    return (
        <div className="game">
            <SideBar allPlayersRef={allPlayersRef} playerId={playerId} setChatActive={setChatActive}/>
            <div id="chat">
                <div className="messages">
                    {allMessagesRef
                    .sort((a, b) => a.time - b.time)
                    .map((message) => (
                        <div key={message.time}>
                            <p><span className="faded">{message.sender}:</span> {message.message}</p>
                        </div>
                    ))}
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

export default Chat;