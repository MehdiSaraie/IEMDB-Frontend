import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import Actor from "./actor/Actor";
import MoviePage from "./movie/Movie";

const HoverableImage = ({entity, type}) => {
    const history = useHistory();
    return (
        <div className={(type === 'actor' ? "hoverable-image actor" : "hoverable-image actor-hoverable-image actor-movie")} onClick={
            () => history.push(type === 'actor' ? `/actors/${entity.id}` : `/movies/${entity.id}`)
            // () => ReactDOM.render(type === 'actor' ? <Actor actor={entity} /> : <MoviePage movieId={entity.id} />, document.getElementById("root"))
            }>
            <img src={entity.image} alt={entity.name} />
            <a className="cover"></a>
            <div className="coverText">
                <a>{entity.name}</a>
                <a>{type === 'actor' ? entity.age : entity.imdbRate}</a>
            </div>
        </div>
    );
}

export default HoverableImage;