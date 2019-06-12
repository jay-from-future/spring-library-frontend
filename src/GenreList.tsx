import React from 'react';
import {Genre} from './domain/Genre';

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
        const {genres} = this.state;
        return (
            <ul className='list-unstyled'>{genres.map(g => {
                return (
                    <li key={g.self}>
                        {g.genre}
                    </li>
                )
            })}</ul>
        );
    }
}

export default GenreList;