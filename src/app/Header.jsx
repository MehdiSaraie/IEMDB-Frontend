import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import iemdb from "../assets/images/template.png";
import { useAuth } from "../hooks/use-auth";
import DropdownList from "./Dropdown";
import Search from "./movies/Search";

const Header = ({withSearch, handleSearchByChange, handleSearchValueChange, searchMovies}) => {
    const history = useHistory();
    const auth = useAuth();

    const [isProfileActive, setIsProfileActive] = useState(false)

    const handleDropdownClick = (e) => {
        const clickedText = e.target.innerHTML;
        if (clickedText === 'لیست تماشا')
            history.push('/watchlist');
        if (clickedText === 'خروج') {
            auth.logout();
            history.push('/login');
        }
    }

    const handleProfileIconClick = (event) => {
        setIsProfileActive(!isProfileActive);
    }

    return (
        <div className="header">
            <img className="iemdbIcon" src={iemdb} />
            <img className="profileIcon" src="https://api.iconify.design/carbon/user-avatar-filled.svg?color=%23292929" onClick={handleProfileIconClick} />
            {withSearch && <Search handleSearchByChange={handleSearchByChange}
                handleSearchValueChange={handleSearchValueChange}
                searchMovies={searchMovies} />}
            {isProfileActive && (<DropdownList items={["لیست تماشا", "خروج"]} clickHandler={handleDropdownClick} />)}
        </div>
    );
}

export default Header;