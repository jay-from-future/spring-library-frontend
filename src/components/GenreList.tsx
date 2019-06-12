import React from 'react';
import GenreGenericComponent from './GenreGenericComponent';

class GenreList extends GenreGenericComponent {

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