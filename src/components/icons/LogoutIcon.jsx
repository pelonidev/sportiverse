import React from "react";

const LogoutIcon = ({ color, hover, transition }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-current text-${color} ${hover} ${transition}`} width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
        <path d="M15 12h-12l3 -3" />
        <path d="M6 15l-3 -3" />
    </svg>
}

export default LogoutIcon