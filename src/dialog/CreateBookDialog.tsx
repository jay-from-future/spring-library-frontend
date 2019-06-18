import React from 'react';
import {GenreSearch} from "./GenreSearch";
import {AuthorSearch} from "./AuthorSearch";

type CreateBookDialogProps = {
    onCreate: { (title: string, authorLinks: Array<string>, genreLinks: Array<string>): void }
}

type CreateBookDialogState = {
    title: string,
    selectedAuthorLinks: Array<string>,
    selectedGenreLinks: Array<string>
    authorErrorFlag: boolean,
    genreErrorFlag: boolean
}

export class CreateBookDialog extends React.Component<CreateBookDialogProps, CreateBookDialogState> {

    constructor(props: CreateBookDialogProps) {
        super(props);

        this.state = {
            title: '',
            selectedAuthorLinks: [],
            selectedGenreLinks: [],
            authorErrorFlag: false,
            genreErrorFlag: false
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeAuthorLinks = this.handleChangeAuthorLinks.bind(this);
        this.handleChangeGenreLinks = this.handleChangeGenreLinks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('+CreateBookDialog.handleChangeTitle');
        this.setState({title: e.currentTarget.value});
    }

    handleChangeAuthorLinks(links: string[]) {
        console.log('+CreateBookDialog.handleChangeAuthorLinks');
        this.setState({
            selectedAuthorLinks: links,
            authorErrorFlag: false,
        });
    }

    handleChangeGenreLinks(links: string[]) {
        console.log('+CreateBookDialog.handleChangeGenreLinks');
        this.setState({
            selectedGenreLinks: links,
            genreErrorFlag: false
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('+CreateBookDialog.handleSubmit');

        const title = this.state.title;
        const authorLinksLength = this.state.selectedAuthorLinks.length;
        const genreLinksLength = this.state.selectedGenreLinks.length;
        if (title && authorLinksLength > 0 && genreLinksLength > 0) {
            this.props.onCreate(title, this.state.selectedAuthorLinks, this.state.selectedGenreLinks);

            this.setState({
                title: '',
                selectedAuthorLinks: [],
                selectedGenreLinks: [],
                authorErrorFlag: false,
                genreErrorFlag: false
            });
        } else {
            this.setState({
                authorErrorFlag: authorLinksLength === 0,
                genreErrorFlag: genreLinksLength === 0
            });
        }
    }

    handleReset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('+CreateBookDialog.handleReset');

        this.setState({
            title: '',
            selectedGenreLinks: [],
            selectedAuthorLinks: [],
            authorErrorFlag: false,
            genreErrorFlag: false
        });
    }

    render() {
        const {title, selectedAuthorLinks, selectedGenreLinks, authorErrorFlag, genreErrorFlag} = this.state;

        let authorError;
        if (authorErrorFlag) {
            authorError = <div className="alert alert-danger" role="alert">
                Please, choose at least one author!
            </div>;
        }

        let genreError;
        if (genreErrorFlag) {
            genreError = <div className="alert alert-danger" role="alert">
                Please, choose at least one genre!
            </div>;
        }

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
                    </div>
                    <AuthorSearch handleChangeAuthorLinks={this.handleChangeAuthorLinks}
                                  clean={selectedAuthorLinks.length === 0}/>
                    {authorError}
                    <GenreSearch handleChangeGenreLinks={this.handleChangeGenreLinks}
                                 clean={selectedGenreLinks.length === 0}/>
                    {genreError}
                    <div className='form-group'>
                        <input type='submit' value='Submit' className='btn btn-primary'/>
                        <input type='reset' value='Reset' className='btn btn-secondary'/>
                    </div>
                </form>
            </div>
        )
    }

}