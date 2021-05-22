/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

export default function SearchBox(props) {
    const [name, setName] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);
    };

    return (
        <form className="d-flex" onSubmit={submitHandler}>

            <input
                type="search"
                name="q"
                id="q"
                onChange={(e) => setName(e.target.value)}
                placeholder="Search" aria-label="Search" className="form-control mr-2"
            ></input>
            <button class="btn btn-outline-success" type="submit">Search</button>

        </form>
    );
}