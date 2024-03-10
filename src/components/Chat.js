import SideBar from "./SideBar";

const Chat = ({allPlayersRef, playerId, setChatActive, allMessagesRef}) => {
    return (
        <div className="game">
            <SideBar allPlayersRef={allPlayersRef} playerId={playerId} setChatActive={setChatActive}/>
            <div id="chat">
                    {allMessagesRef
                    .sort((a, b) => a.time - b.time)
                    .map((message) => (
                        <div key={message.time}>
                            <p><span className="faded">{message.sender}:</span> {message.message}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Chat;