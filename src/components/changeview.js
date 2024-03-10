import React, { useState } from "react";

const ToggleButton = ({ setChatActive }) => {
    const [toggle, setToggle] = useState(false);
    
    const handleToggle = () => {
        setToggle(!toggle);
        setChatActive(toggle ? true : false);
    };
    
    return (
        <button onClick={handleToggle} className="change-view">
            {toggle ? "Chat" : "Chat"}
        </button>
    );
};

export default ToggleButton;