import {Genre} from "../domain/Genre";
import React from "react";

const url = process.env.REACT_APP_URL;

type GenreGenericComponentProps = {
    genresLink: string
}

type GenreGenericComponentState = {
    genres: Array<Genre>
}

export default abstract class GenreGenericComponent extends React.Component<GenreGenericComponentProps,
    GenreGenericComponentState> {

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
        let genresLink = `${url}/genres`;
        if (this.props.genresLink) {
            genresLink = this.props.genresLink;
        }

        console.log('+loadGenres:' + genresLink);
        const accessToken = localStorage.getItem('access_token');
        fetch(genresLink, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
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