import React, { useEffect, useState } from 'react';
import Movies from "../movies/Movies";

export default function Home() {
    document.title = 'IEMDB';

    return (
        <div className="container">
            <Movies/>
        </div>
    );
}
