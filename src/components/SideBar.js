import ToggleButton from "./changeview";

const SideBar = ({allPlayersRef, playerId, setChatActive}) => {
    return (
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
            <ToggleButton setChatActive={setChatActive}/>
      </div>
    );
};

export default SideBar;