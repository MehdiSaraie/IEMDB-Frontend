import React, { Component } from "react";
import reactDom from "react-dom";
import "../../assets/css/watchlist.css";
import Header from "../Header";
import { apiUrl } from "../../..";
import HoverableImage from "../HoverableImage";
import Login from "../login/Login";

class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {watchlist: []};
    }

    fetchWatchlist = async () => {
        const response = await fetch(apiUrl + "watchlist");
        if (response.ok) {
            const watchlist = await response.json();
            this.setState(prevState => ({watchlist: watchlist}));
            console.log(watchlist);
        }
        if (response.status === 401)
            reactDom.render(<Login page="watchlist" />, document.getElementById("root"));
    };

    removeFromWatchlist = async (movieId) => {
        let response = await fetch(apiUrl + "watchlist?movie_id=" + movieId, {method: "DELETE"});
        if (response.ok) {
            this.fetchWatchlist();
        }
        if (response.status === 401)
            reactDom.render(<Login page="watchlist" />, document.getElementById("root"));
    }

    componentDidMount() {
        this.fetchWatchlist();
    }

    render() {
        return (
            <>
                <Header />
                <div className="main watchlist-main">
                    <div className="watchlistMovies">
                        {this.state.watchlist.map((movie, index) => <WatchlistMovie key={index} movie={movie} removeFromWatchlist={this.removeFromWatchlist} />)}
                    </div>
                    <div className="suggestedMovies">
                        <p>فیلم های پیشنهادی</p>
                        <div className="moviesContainer horizontal-scrollable">
                            {this.state.watchlist.map((movie, index) => <SuggestedMovie key={index} movie={movie} />)}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const WatchlistMovie = ({movie, removeFromWatchlist}) => {
    return (
        <div className="watchlist-movie">
            <div className="watchlist-info">
                <div className="watchlist-details">
                    <div onClick={() => removeFromWatchlist(movie.id)}>
                        <span className="iconify trashIcon" data-icon="dashicons:trash" data-width="32"></span>
                    </div>
                    <p><span>کارگردان: </span>{movie.director}</p>
                    <p><span>ژانر: </span>{movie.genres.join('، ')}</p>
                    <p><span>تاریخ انتشار: </span>{movie.releaseDate}</p>
                    <p><span>مدت زمان: </span>{movie.duration}</p>
                </div>
                <div className="watchlist-rates">
                    <br />
                    <br />
                    <p>امتیاز IMDB: {movie.imdbRate}</p>
                    <br />
                    <p>امتیاز کاربران: {movie.rating}</p>
                </div>
                <div className="watchlist-title">
                    <p>{movie.name}</p>
                </div>
            </div>
            <div className="watchlist-normalImage">
                <img src={movie.image} />
            </div>
        </div>
    );
}

const SuggestedMovie = ({movie}) => {
    return (
        <div className="hoverable-image watchlist-movie">
            <img src={movie.image} />
            <a className="cover"></a>
            <div className="coverText">
                <a>{movie.name}</a>
                <a>{movie.imdbRate}</a>
            </div>
        </div>
    );
}

export default Watchlist;
        // <div className="main">
        //     <div className="suggestedMovies">
        //         <p>فیلم های پیشنهادی</p>
        //         <div className="moviesContainer horizontal-scrollable">
        //             <div className="hoverable-image watchlist-movie">
        //                 <img src="../image/salesman.jpg" />
        //                 <a href="../movie/movie.html" className="cover"></a>
        //                 <a href="../movie/movie.html" className="coverText">Salesman</a>
        //                 <a href="../movie/movie.html" className="coverText">9.2</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>