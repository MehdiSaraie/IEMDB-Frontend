import React from "react";
import dropDown from "../../assets/images/drop-down.png";
import search from "../../assets/images/search.png";
import DropdownList from "../Dropdown";

const Search = ({handleSearchByChange, handleSearchValueChange, searchMovies}) => {
    const onSearchByChange = (event) => {
        document.getElementById('searchByText').innerHTML = event.target.innerHTML;
        handleSearchByChange(event);
    }

    return (
        <>
            <div className="box" id="searchBy">
                <p id="searchByText">جستجو بر اساس:</p>
                <img className="rightPlaced" src={dropDown} />
                <DropdownList items={["نام", "ژانر", "تاریخ انتشار"]} clickHandler={onSearchByChange} />
            </div>
            <div className="box" id="searchBox">
                <img className="rightPlaced" src={search} onClick={searchMovies} />
                <input type="text" onChange={handleSearchValueChange} onKeyUp={searchMovies}></input>
            </div>
        </>
    );
}

export default Search;