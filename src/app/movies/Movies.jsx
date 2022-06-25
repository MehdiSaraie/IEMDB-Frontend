import React, { Component } from "react";
import "../../assets/css/movies.css"
import Header from "../Header";
import Sort from "./Sort";
import { apiUrl } from "../../..";
import { useHistory } from 'react-router-dom';
import { privateRequest } from "../../services/private";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {searchBy: "", searchValue: "", sortBy: "imdbRate", movies: []};
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
        const movies = await privateRequest(apiUrl + "movies?" + filter + "&sortBy=" + (sortBy === "تاریخ" ? "date" : "imdbRate"));
        if (!!movies)
            this.setState(prevState => ({movies: movies}));
            
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
    const history = useHistory();
    return (
        <div className="movie">
            <div className="hoverable-image" onClick={() => history.push(`/movies/${movie.id}`)}>
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