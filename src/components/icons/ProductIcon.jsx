import React from "react";

const ProductIcon = ({ color, hover, transition }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`stroke-current text-${color} ${hover} ${transition}`} width="36" height="36" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
        <path d="M12 12l8 -4.5" />
        <path d="M12 12l0 9" />
        <path d="M12 12l-8 -4.5" />
    </svg>
}

export default ProductIcon