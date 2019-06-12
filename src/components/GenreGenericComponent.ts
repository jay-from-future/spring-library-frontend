import {Genre} from "../domain/Genre";
import React from "react";

const url = process.env.REACT_APP_URL;

type GenreState = {
    genres: Array<Genre>
}

export default abstract class GenreGenericComponent extends React.Component<any, GenreState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);
        this.state = {genres: new Array<Genre>()};
        this.loadGenres = this.loadGenres.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadGenres();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    loadGenres() {
        console.log('+loadGenres:' + url);
        fetch(url + '/genres')
            .then(response => response.json())
            .then(result => {
                const genres = result._embedded.genres.map((g: any) => {
                    return new Genre(g._links.self.href, g.genre);
                });
                if (this._isMounted) {
                    this.setState({genres: genres});
                }
            }, error => {
                console.error(error)
            });

    };


}