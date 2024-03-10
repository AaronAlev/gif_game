import SideBar from "./SideBar";

const PreGame = ({allPlayersRef, playerId, gameStart}) => {
    return (
        <div className='game'>
            <SideBar allPlayersRef={allPlayersRef} playerId={playerId} setChatActive={null}/>
        <div className="start-game">
          <form onSubmit={gameStart} id='start-game'>
            <button type="submit" id='start-game'>Start Game</button>
          </form>
        </div>
      </div>
    );
};

export default PreGame;