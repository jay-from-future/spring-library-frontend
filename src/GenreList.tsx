import React from "react";
import {Genre} from "./Genre";

type GenreListProps = {
    genresLink: string
}

type GenreListState = {
    genres: Array<Genre>
}

class GenreList extends React.Component<GenreListProps, GenreListState> {
    constructor(props: Readonly<GenreListProps>) {
        super(props);
        this.state = {genres: new Array<Genre>()};
    }

    componentDidMount(): void {
        this.loadGenres();
    }

    loadGenres() {
        fetch(this.props.genresLink)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let genres = result._embedded.genres.map((g: any) => {
                    return new Genre(g._links.self.href, g.genre);
                });
                this.setState({
                    genres: genres
                });
            }, error => {
                console.error(error)
            })
    }

    render() {

        const genres = this.state.genres.map(g => {
            return <GenreItem key={g.self} self={g.self} genre={g.genre}/>
        });
        return (
            <ul className="list-unstyled">{genres}</ul>
        );
    }
}

class GenreItem extends React.Component<Genre> {
    render() {
        return (
            <li>
                {this.props.genre}
            </li>
        );
    }
}

export default GenreList;