import React from "react";
import DropdownList from "../Dropdown";

const Sort = ({handleSortByChange}) => {
    return (
        <div className="sortBy">
            <p>رتبه بندی بر اساس:</p>
            <DropdownList items={["تاریخ", "امتیاز imdb"]} clickHandler={handleSortByChange} />
        </div>
    );
}

export default Sort;