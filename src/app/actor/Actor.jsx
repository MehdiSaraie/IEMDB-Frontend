import React, { Component } from "react";
import "../../assets/css/actor.css";
import Header from "../Header";
import { apiUrl } from "../../..";
import HoverableImage from "../HoverableImage";

class Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {actedMovies: [], actor: null};
    }
    
    fetchActor = async () => {
        const response = await fetch(apiUrl + "actors/" + this.props.match.params.id);
        try {
            const actor = await response.json();
            this.setState(prevState => ({actor: actor}));
        } catch {
            console.log(response);
        }
    };

    fetchActedMovies = async () => {
        const response = await fetch(apiUrl + "movies?actor_id=" + this.props.match.params.id);
        try {
            const actedMovies = await response.json();
            this.setState(prevState => ({actedMovies: actedMovies}));
        } catch {
            console.log(response);
        }
    }

    componentDidMount() {
        this.fetchActor();
        this.fetchActedMovies();
    }

    render() {
        return (
            <>
                <Header />
                <div className="main actor-main">
                    <div className="actor-details">
                        <div className="actor-info">
                            <p>مشخصات بازیگر</p>
                            <p>نام: {this.state.actor?.name}</p>
                            <p>تاریخ تولد: {this.state.actor?.birthDate}</p>
                            <p>ملیت: {this.state.actor?.nationality}</p>
                            <p>تعداد فیلم ها: {this.state.actedMovies.length}</p>
                        </div>
                        <div className="actor-movies">
                            <p>فیلم ها</p>
                            <div className="actor-moviesContainer horizontal-scrollable">
                                {this.state.actedMovies.map((movie, index) => <HoverableImage key={index} entity={movie} type='movie' />)}
                            </div>
                        </div>
                    </div>
                    <div className="actor-actor">
                        <img src={this.state.actor?.image} />
                    </div>
                </div>
            </>
        );
    }
}

export default Actor;