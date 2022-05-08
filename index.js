import React from "react";
import reactDom from "react-dom";
import "./src/assets/css/reset.css";
import "./src/assets/css/shared.css";
import Movies from "./src/components/movies/Movies";

export const apiUrl = "http://localhost:8080/iemdb_war/";

reactDom.render(<Movies />, document.getElementById("root"));