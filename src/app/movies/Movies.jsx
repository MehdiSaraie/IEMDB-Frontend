import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "../../assets/css/movies.css"
import Header from "../Header";
import Sort from "./Sort";
import { apiUrl } from "../../..";
import MoviePage from "../movie/Movie";

export default function Movies(email) {
    const [searchBy, setSearchBy] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sortBy, setSortBy] = useState("imdbRate");
    const [isProfileActive, setIsProfileActive] = useState(false);
    const [movies, setMovies] = useState([]);

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.innerHTML);
    };

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.innerHTML);
    };

    const handleProfileIconClick = (event) => {
        setIsProfileActive(!isProfileActive);
    }

    const searchMovies = (event) => {
        if (!event.keyCode || event.keyCode === 13)
            fetchMovies();
    }

    const fetchMovies = () => {
        let filter = "";
        if (searchBy === "نام")
            filter = "name=" + searchValue;
        if (searchBy === "ژانر")
            filter = "genre=" + searchValue;
        if (searchBy === "تاریخ انتشار")
            filter = "releaseDate=" + searchValue;
        const response = fetch(apiUrl + "movies?" + filter + "&sortBy=" + (sortBy === "تاریخ" ? "date" : "imdbRate"));
        try {
            const movies = response.json();
            setMovies(movies)
            console.log(movies);
        } catch {
            console.log(response);
        }
    }

    return (
        <>
            <Header
                withSearch={true}
                handleSearchByChange={handleSearchByChange}
                handleSearchValueChange={handleSearchValueChange}
                searchMovies={searchMovies}
                userEmail={email}
                handleProfileIconClick={handleProfileIconClick}
                isProfileActive={isProfileActive}
            />
            <div className="main">
                <div className="movies">
                    {movies.map((movie, index) => <Movie key={index} movie={movie} />)}
                </div>
                <Sort handleSortByChange={handleSortByChange} />
            </div>
        </>
    );

}

const Movie = ({movie}) => {
    return (
        <div className="movie">
            <div className="hoverable-image" onClick={() => ReactDOM.render(<MoviePage movie={movie} />, document.getElementById("root"))}>
                <img src={movie.image} alt={movie.name} />
                <a className="cover"></a>
                <div className="coverText">
                    <a>{movie.name}</a>
                    <a>{movie.imdbRate}</a>
                </div>
            </div>
        </div>
    );
}
