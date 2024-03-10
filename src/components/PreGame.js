const PreGame = ({allPlayersRef, playerId, gameStart}) => {
    return (
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
    );
};

export default PreGame;