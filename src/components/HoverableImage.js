import React from "react";
import reactDom from "react-dom";
import Actor from "./actor/Actor";
import MoviePage from "./movie/Movie";

const HoverableImage = ({entity, type}) => {
    return (
        <div className={(type === 'actor' ? "hoverable-image actor" : "hoverable-image actor-hoverable-image actor-movie")} onClick={() => reactDom.render(type === 'actor' ? <Actor actor={entity} /> : <MoviePage movie={entity} />, document.getElementById("root"))}>
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