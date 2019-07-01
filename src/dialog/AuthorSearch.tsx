import * as React from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

const url = process.env.REACT_APP_URL;
const searchUrl = process.env.REACT_APP_SEARCH_URL;

type AuthorSearchProps = {
    handleChangeAuthorLinks: { (authorLinks: Array<string>): void }
    clean: boolean
}

type AuthorSearchState = {
    Author: string,
    options: [{ author: string, self: string }],
    selected: { author: string, self: string }[],
    isLoading: boolean
    clean: boolean
}

export class AuthorSearch extends React.Component<AuthorSearchProps, AuthorSearchState> {

    private typeahead: any;

    constructor(props: AuthorSearchProps) {
        super(props);
        this.state = {
            Author: '',
            options: [{author: '', self: ''}],
            selected: [{author: '', self: ''}],
            isLoading: false,
            clean: props.clean
        };

        this.handleSearchAuthor = this.handleSearchAuthor.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
    }

    loadAuthors(query: string) {
        console.log('+AuthorSearch.loadAuthors');
        fetch(`${searchUrl}/authors/searchByName?name=${query}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let authors = result.map((a: any) => {
                    return {self: url + 'authors/' + a.id, author: a.fullName};
                });
                this.setState({
                    isLoading: false,
                    options: authors
                });
            }, error => {
                console.error(error);
            });
    }

    handleSearchAuthor(query: string) {
        console.log('+CreateBookDialog.handleSearchAuthor');
        this.setState({isLoading: true});
        this.loadAuthors(query);
    }

    handleChangeAuthor(selected: { author: string, self: string }[]) {
        console.log('+CreateBookDialog.handleChangeAuthor');
        this.setState({selected: selected});
        const links = selected.map((a: any) => a.self);
        this.props.handleChangeAuthorLinks(links);
    }

    componentWillReceiveProps(nextProps: Readonly<AuthorSearchProps>, nextContext: any): void {
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
                <label htmlFor='Author'>Author</label>
                <AsyncTypeahead
                    id='AuthorInput'
                    multiple
                    minLength={1}
                    labelKey='author'
                    placeholder="Start to type a Author..."
                    isLoading={this.state.isLoading}
                    onSearch={this.handleSearchAuthor}
                    onChange={this.handleChangeAuthor}
                    options={this.state.options}
                    ref={(ref) => this.typeahead = ref}
                />
            </div>
        );
    }
}