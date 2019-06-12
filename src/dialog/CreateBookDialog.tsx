import React from 'react';
import {Author} from '../domain/Author';
import {Genre} from '../domain/Genre';

type CreateBookDialogProps = {
    authorsLink: string,
    genresLink: string,
    onCreate: { (title: string, authorLinks: Array<string>, genreLinks: Array<string>): void }
}

type CreateBookDialogState = {
    title: string,
    selectedAuthorLink: Array<string>,
    selectedGenreLink: Array<string>,
    authors: Array<Author>,
    genres: Array<Genre>,
}

export class CreateBookDialog extends React.Component<CreateBookDialogProps, CreateBookDialogState> {

    constructor(props: CreateBookDialogProps) {
        super(props);

        this.state = {
            title: '',
            authors: [],
            genres: [],
            selectedAuthorLink: [''],
            selectedGenreLink: ['']
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount(): void {
        this.loadAuthors();
        this.loadGenres();
    }

    loadAuthors() {
        const authorsLink = this.props.authorsLink;
        fetch(authorsLink)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let authors = result._embedded.authors.map((a: any) => {
                    return new Author(a._links.self.href, a.firstName, a.lastName);
                });
                let authorLinks = authors.map((a: Author) => {
                    return a.self;
                });
                this.setState({
                    authors: authors,
                    selectedAuthorLink: [authorLinks[0]]
                });
            }, error => {
                console.error(error)
            });

    }

    loadGenres() {
        fetch(this.props.genresLink)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let genres = result._embedded.genres.map((g: any) => {
                    return new Genre(g._links.self.href, g.genre);
                });
                let genreLinks = genres.map((g: Genre) => {
                    return g.self;
                });
                this.setState({
                    genres: genres,
                    selectedGenreLink: [genreLinks[0]]
                });
            }, error => {
                console.error(error)
            });
    }

    handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('+CreateBookDialog.handleChangeTitle');
        this.setState({title: e.currentTarget.value});
    }

    handleChangeAuthor(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log('+CreateBookDialog.handleChangeAuthor');
        this.setState({
            selectedAuthorLink: [e.currentTarget.value]
        });
    }

    handleChangeGenre(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log('+CreateBookDialog.handleChangeGenre');
        this.setState({
            selectedGenreLink: [e.currentTarget.value]
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('+CreateBookDialog.handleSubmit');

        this.props.onCreate(this.state.title, this.state.selectedAuthorLink, this.state.selectedGenreLink);

        this.setState({
            title: '',
            selectedAuthorLink: [''],
            selectedGenreLink: ['']
        });

        this.loadAuthors();
        this.loadGenres();
    }

    handleReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('+CreateBookDialog.handleReset');
        console.log(this.state.selectedAuthorLink);
        console.log(this.state.selectedGenreLink);

        this.setState({
            title: '',
            selectedAuthorLink: [''],
            selectedGenreLink: ['']
        });

        this.loadAuthors();
        this.loadGenres();
    }

    render() {
        const {authors, genres, title, selectedAuthorLink, selectedGenreLink} = this.state;

        const authorOptions = authors.map(a => {
            return (
                <option key={a.self} value={a.self}>{a.firstName + ' ' + a.lastName}</option>);
        });

        const genreOptions = genres.map(g => {
            return (<option key={g.self} value={g.self}>{g.genre}</option>);
        });

        return (
            <div className='container'>
                <h2>Create new book</h2>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset} className='needs-validation'>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' className='form-control' id='title' placeholder='Title'
                               value={title}
                               onChange={this.handleChangeTitle}
                               required/>

                        <label htmlFor='author'>Author</label>
                        <select className='form-control' id='author' onChange={this.handleChangeAuthor}
                                value={selectedAuthorLink[0]}>
                            {authorOptions}
                        </select>

                        <label htmlFor='genre'>Genre</label>
                        <select className='form-control' id='genre' onChange={this.handleChangeGenre}
                                value={selectedGenreLink[0]}>
                            {genreOptions}
                        </select>
                    </div>

                    <div className='form-group'>
                        <input type='submit' value='Submit' className='btn btn-primary'/>
                        <input type='reset' value='Reset' className='btn btn-secondary'/>
                    </div>
                </form>
            </div>
        )
    }

}