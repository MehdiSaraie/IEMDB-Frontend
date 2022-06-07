import React from "react";

const DropdownList = ({items, clickHandler}) => {
    return (
        <div className="dropdown">
            {items.map((item, index) => <p key={index} onClick={clickHandler}>{item}</p>)}
        </div>
    );
}

export default DropdownList;