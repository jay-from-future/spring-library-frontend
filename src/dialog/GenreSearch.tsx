import * as React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

const url = process.env.REACT_APP_URL;
const searchUrl = process.env.REACT_APP_SEARCH_URL;

type GenreSearchProps = {
    handleChangeGenreLinks: { (genreLinks: Array<string>): void },
    clean: boolean
}

type GenreSearchState = {
    genre: string,
    options: [{ genre: string, self: string }],
    selected: { genre: string, self: string }[],
    isLoading: boolean,
    clean: boolean
}

export class GenreSearch extends React.Component<GenreSearchProps, GenreSearchState> {

    private typeahead: any;

    constructor(props: GenreSearchProps) {
        super(props);
        this.state = {
            genre: '',
            options: [{genre: '', self: ''}],
            selected: [{genre: '', self: ''}],
            isLoading: false,
            clean: props.clean
        };

        this.handleSearchGenre = this.handleSearchGenre.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
    }

    loadGenres(query: string) {
        console.log('+GenreSearch.loadGenres');
        fetch(`${searchUrl}/genres/searchByGenre?genre=${query}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let genres = result.map((g: any) => {
                    return {self: `${url}/genres/` + g.id, genre: g.genre};
                });
                this.setState({
                    isLoading: false,
                    options: genres
                });
            }, error => {
                console.error(error);
            });
    }

    handleSearchGenre(query: string) {
        console.log('+CreateBookDialog.handleSearchGenre');
        this.setState({isLoading: true});
        this.loadGenres(query);
    }

    handleChangeGenre(selected: { genre: string, self: string }[]) {
        console.log('+CreateBookDialog.handleChangeGenre');
        this.setState({selected: selected});
        const links = selected.map((g: any) => g.self);
        this.props.handleChangeGenreLinks(links);
    }

    componentWillReceiveProps(nextProps: Readonly<GenreSearchProps>, nextContext: any): void {
        console.log('+AuthorSearch.componentWillReceiveProps', nextProps);
        if (nextProps.clean !== this.props.clean) {
            this.setState({
                clean: nextProps.clean
            });
        }
    }

    render() {
        const clean = this.state.clean;
        if (clean && this.typeahead) {
            this.typeahead._instance.clear();
            this.setState({
                clean: !clean
            });
        }
        return (
            <div className='form-group'>
                <label htmlFor='genre'>Genre</label>
                <AsyncTypeahead
                    id='genreInput'
                    multiple
                    minLength={1}
                    labelKey='genre'
                    placeholder="Start to type a genre..."
                    isLoading={this.state.isLoading}
                    onSearch={this.handleSearchGenre}
                    onChange={this.handleChangeGenre}
                    options={this.state.options}
                    ref={(ref) => this.typeahead = ref}
                />
            </div>

        );
    }
}