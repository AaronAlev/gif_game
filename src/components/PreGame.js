const PreGame = ({allPlayersRef, playerId, gameStart}) => {
    return (
        <div className='game'>
          <div className="sidebar">
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
            <div id="view-change">
              <form>
                <button type="submit" id="leave-game">Chat</button>
              </form>
              <form>
                <button type="submit" id="leave-game">Game</button>
              </form>
            </div>
          </div>
        <div className="start-game">
          <form onSubmit={gameStart} id='start-game'>
            <button type="submit" id='start-game'>Start Game</button>
          </form>
        </div>
      </div>
    );
};

export default PreGame;