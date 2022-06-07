import React from "react";
import ReactDOM from "react-dom";
import iemdb from "../assets/images/template.png";
import DropdownList from "./Dropdown";
import Login from "./login/Login";
import Signup from "./login/Signup";
import Search from "./movies/Search";
import Watchlist from "./watchlist/Watchlist";

const Header = ({withSearch, handleSearchByChange, handleSearchValueChange, searchMovies, handleProfileIconClick, isProfileActive, userEmail}) => {
    const handleClick = (e) => {
        const clickedText = e.target.innerHTML;
        if (clickedText === 'watch list')
            ReactDOM.render(<Watchlist />, document.getElementById("root"));
        if (clickedText === 'ورود')
            ReactDOM.render(<Login/>, document.getElementById("root"));
        if (clickedText === 'ثبت نام')
            ReactDOM.render(<Signup/>, document.getElementById("root"));
    }

    return (
        <div className="header">
            <img className="iemdbIcon" src={iemdb} />
            <img className="profileIcon" src="https://api.iconify.design/carbon/user-avatar-filled.svg?color=%23292929" onClick={handleProfileIconClick} />
            {withSearch && <Search handleSearchByChange={handleSearchByChange}
                handleSearchValueChange={handleSearchValueChange}
                searchMovies={searchMovies} />}
            <DropdownList items={["ورود", "ثبت نام"]} clickHandler={handleClick}/>
        </div>
    );
}

export default Header;