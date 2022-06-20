import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "../../assets/css/movie.css";
import star from "../../assets/images/star.png";
import Header from "../Header";
import { apiUrl } from "../../..";
import HoverableImage from "../HoverableImage";
import Login from "../login/Login";
import Watchlist from "../watchlist/Watchlist";

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {actors: [], movie: null};
    }

    fetchMovie = async () => {
        const response = await fetch(apiUrl + "movies/" + this.props.match.params.id);
        try {
            const movie = await response.json();
            this.setState(prevState => ({movie: movie}));
            console.log(movie);
        } catch {
            console.log(response);
        }
    };

    fetchActors = async () => {
        const response = await fetch(apiUrl + "actors?movie_id=" + this.props.match.params.id);
        try {
            const actors = await response.json();
            this.setState(prevState => ({actors: actors}));
            console.log(actors);
        } catch {
            console.log(response);
        }
    };

    addtoWatchlist = async () => {
        let response = await fetch(apiUrl + "watchlist?movie_id=" + this.state.movie.id, {method: "POST"});
        if (response.ok) {
            ReactDOM.render(<Watchlist />, document.getElementById("root"));
        }
        if (response.status === 401)
            ReactDOM.render(<Login page="watchlist" />, document.getElementById("root"));
    }

    componentDidMount() {
        this.fetchMovie();
        this.fetchActors();
    }

    render() {
        return (
            <>
                <Header />
                <div className="main">
                    <div className="bigMovieContainer">
                        <img src={this.state.movie?.coverImage} />
                    </div>
                    <div className="tiser">
                        <MovieRate movie={this.state.movie} />
                        <MovieDetails movie={this.state.movie} />
                        <div className="smallMovieContainer">
                            <img src={this.state.movie?.image} alt={this.state.movie?.name} />
                            <button className="addToWatchlistBtn" onClick={this.addtoWatchlist}>افزودن به لیست مشاهده</button>
                        </div>
                    </div>
                    <Actors actors={this.state.actors} />
                    <Comments basicComments={this.state.movie?.comments} movie={this.state.movie} />
                </div>
            </>
        )
    }
}

const MovieDetails = ({movie}) => {
    return (
        <div className="details">
            <p className="title">{movie?.name}</p>
            <p>کارگردان: {movie?.director}</p>
            <p>نویسنده: {movie?.writers.join(', ')}</p>
            <p>مدت زمان: {movie?.duration}</p>
            <br />
            <p className="releaseDate">تاریخ انتشار: {movie?.releaseDate}</p>
            <hr />
            <p className="summary">{movie?.summary}</p>
        </div>
    )
}

const MovieRate = ({movie}) => {
    return (
        <div className="rateContainer">
            <div className="imdbRate">
                <p>{movie?.imdbRate}</p>
            </div>
            <div className="star">
                <img src={star} />
            </div>
            <div className="userRate">
                <div>
                    <p className="userRateText">امتیاز کاربران</p>
                    <p className="numRates">({movie?.ratingCount} رای)</p>
                </div>
                <div>
                    <p>{movie?.rating}</p>
                </div>
            </div>
        </div>
    );
}

const Actors = ({actors}) => {
    return (
        <div className="actors centeredBox">
            <p>بازیگران</p>
            <div className="actorsContainer horizontal-scrollable">
                {actors.map((actor, index) => <HoverableImage key={index} entity={actor} type='actor' />)}
            </div>
        </div>
    )
}

const Comments = ({basicComments, movie}) => {
    const [newCommentText, setNewCommentText] = useState("");
    const [comments, setComments] = useState(basicComments);
    
    const addComment = async () => {
        const response = await fetch(`${apiUrl}movies/${movie.id}/addComment`, {method: "POST", body: newCommentText});
        if (response.ok) {
            const newComments = await response.json();
            setComments(prevComments => newComments);
            console.log(newComments);
        }
        if (response.status === 401)
            ReactDOM.render(<Login page="movie" movie={movie} />, document.getElementById("root"));
    };

    return (
        <div className="comments centeredBox">
            <p>دیدگاه ها</p>
            <div className="comment">
                <p>دیدگاه خود را اضافه کنید:</p>
                <hr />
                <textarea className="commentText" onChange={(e) => setNewCommentText(e.target.value)} value={newCommentText}></textarea>
                <div className="submit" onClick={addComment}>ثبت</div>
            </div>
            {comments?.map((comment, index) => <Comment key={index} comment={comment} movie={movie} />)}
        </div>
    );
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {vote: 0, like: this.props.comment.like, dislike: this.props.comment.dislike};
    }

    handleVoteChange = (newVote) => {
        if (this.state.vote === newVote)
            this.setState(prevState => ({vote: 0}));
        else
            this.setState(prevState => ({vote: newVote}));
    };

    voteComment = async () => {
        const response = await fetch(`${apiUrl}comments/${this.props.comment.id}/addVote?vote=${this.state.vote}`, {method: "POST"})
        if (response.status === 200) {
            const comment = await response.json();
            this.setState(prevState => ({like: comment.like, dislike: comment.dislike}));
        }
        if (response.status === 401)
            ReactDOM.render(<Login page="movie" movie={this.props.movie} />, document.getElementById("root"));
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.vote !== this.state.vote)
            this.voteComment();
    }

    render() {
        return (
            <div className="comment">
                <p className="username">{this.props.comment.userNickname}</p>
                <hr />
                <div>
                    <p className="commentText">{this.props.comment.text}</p>
                    <div className="votes">
                        <div>
                            <div onClick={() => this.handleVoteChange(1)}>
                                <span className="iconify upvote" data-icon="akar-icons:circle-chevron-up-fill" data-width="2vw" data-height="2vw"></span>
                            </div>
                            <p>{this.state.like}</p>
                        </div>
                        <div>
                            <div onClick={() => this.handleVoteChange(-1)}>
                                <span className="iconify downvote" data-icon="akar-icons:circle-chevron-down-fill" data-width="2vw" data-height="2vw"></span>
                            </div>
                            <p>{this.state.dislike}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoviePage;
