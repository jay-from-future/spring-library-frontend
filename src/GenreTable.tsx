import React from 'react';
import {Genre} from './domain/Genre';

type GenreTableProps = {
    genresLink: string
}

type GenreTableState = {
    genres: Array<Genre>
}

class GenreTable extends React.Component<GenreTableProps, GenreTableState> {
    constructor(props: Readonly<GenreTableProps>) {
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
            return <GenreRow key={g.self} self={g.self} genre={g.genre}/>
        });
        return (
            <div className='container'>
                <h1 className='mt-5'>Genres:</h1>
                <p className='lead'>List of all book genres in the library:</p>
                <table className='table table-bordered'>
                    <thead className='thead-dark'>
                    <tr>
                        <th>Genre</th>
                    </tr>
                    </thead>
                    <tbody>
                    {genres}
                    </tbody>
                </table>
            </div>
        );
    }
}

class GenreRow extends React.Component<Genre> {
    render() {
        return (
            <tr>
                <td>
                    {this.props.genre}
                </td>
            </tr>
        );
    }
}

export default GenreTable;