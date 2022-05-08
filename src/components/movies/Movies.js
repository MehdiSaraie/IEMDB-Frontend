import React, { Component } from "react";
import reactDom from "react-dom";
import "../../assets/css/movies.css"
import Header from "../Header";
import Sort from "./Sort";
import { apiUrl } from "../../..";
import MoviePage from "../movie/Movie";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {searchBy: "", searchValue: "", sortBy: "imdbRate", isProfileActive: false, movies: []};
    }

    handleSearchByChange = (event) => {
        this.setState(prevState => ({searchBy: event.target.innerHTML}));
    };

    handleSearchValueChange = (event) => {
        this.setState(prevState => ({searchValue: event.target.value}));
    };

    handleSortByChange = (event) => {
        this.setState(prevState => ({sortBy: event.target.innerHTML}));
    };

    handleProfileIconClick = (event) => {
        this.setState(prevState => ({isProfileActive: !prevState.isProfileActive}));
    }

    searchMovies = (event) => {
        if (!event.keyCode || event.keyCode === 13)
            this.fetchMovies();
    }

    fetchMovies = async () => {
        const [searchBy, searchValue, sortBy] = [this.state.searchBy, this.state.searchValue, this.state.sortBy];
        let filter = "";
        if (searchBy === "نام")
            filter = "name=" + searchValue;
        if (searchBy === "ژانر")
            filter = "genre=" + searchValue;
        if (searchBy === "تاریخ انتشار")
            filter = "releaseDate=" + searchValue;
        const response = await fetch(apiUrl + "movies?" + filter + "&sortBy=" + (sortBy === "تاریخ" ? "date" : "imdbRate"));
        try {
            const movies = await response.json();
            this.setState(prevState => ({movies: movies}));
            console.log(movies);
        } catch {
            console.log(response);
        }
    }

    componentDidMount() {
        this.fetchMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sortBy !== this.state.sortBy)
            this.fetchMovies();
    }

    render() {
        return (
            <>
                <Header 
                    withSearch={true} 
                    handleSearchByChange={this.handleSearchByChange} 
                    handleSearchValueChange={this.handleSearchValueChange}
                    searchMovies={this.searchMovies}
                    userEmail={this.props.userEmail}
                    handleProfileIconClick={this.handleProfileIconClick}
                    isProfileActive={this.state.isProfileActive}
                />
                <div className="main">
                    <div className="movies">
                        {this.state.movies.map((movie, index) => <Movie key={index} movie={movie} />)}
                    </div>
                    <Sort handleSortByChange={this.handleSortByChange} />
                </div>
            </>
        );
    }
}

const Movie = ({movie}) => {
    return (
        <div className="movie">
            <div className="hoverable-image" onClick={() => reactDom.render(<MoviePage movie={movie} />, document.getElementById("root"))}>
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

export default Movies;