import React from 'react';
import GenreGenericComponent from "./GenreGenericComponent";

class GenreTable extends GenreGenericComponent {

    render() {
        const {genres} = this.state;

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
                    {genres.map(g => {
                        return (
                            <tr key={g.self}>
                                <td>
                                    {g.genre}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GenreTable;