import React from "react";

const CategoryIcon = ({ color, hover, transition }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-current text-${color} ${hover} ${transition}`} width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6h-6z" />
        <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    </svg>
}

export default CategoryIcon