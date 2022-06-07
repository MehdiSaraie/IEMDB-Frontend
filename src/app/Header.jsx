import React from "react";
import reactDom from "react-dom";
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
            reactDom.render(<Watchlist />, document.getElementById("root"));
        if (clickedText === 'ورود')
            reactDom.render(<Login/>, document.getElementById("root"));
        if (clickedText === 'ثبت نام')
            reactDom.render(<Signup/>, document.getElementById("root"));
    }

    return (
        <div className="header">
            <img className="iemdbIcon" src={iemdb} />
            <img className="profileIcon" src="https://api.iconify.design/carbon/user-avatar-filled.svg?color=%23292929" onClick={handleProfileIconClick} />
            {withSearch && <Search handleSearchByChange={handleSearchByChange}
                handleSearchValueChange={handleSearchValueChange}
                searchMovies={searchMovies} />}
            {isProfileActive && withSearch && (<DropdownList items={userEmail ? [userEmail, "watch list"] : ["ورود", "ثبت نام"]} clickHandler={handleClick} />)}
        </div>
    );
}

export default Header;