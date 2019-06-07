import React from "react";
import {Author} from "./Author";

type AuthorListProps = {
    authorsLink: string
}
type AuthorListState = {
    authors: Array<Author>
}

class AuthorList extends React.Component<AuthorListProps, AuthorListState> {

    constructor(props: Readonly<AuthorListProps>) {
        super(props);
        this.state = {authors: new Array<Author>()};
    }

    componentDidMount(): void {
        this.loadAuthors();
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
                this.setState({
                    authors: authors
                });
            }, error => {
                console.error(error)
            })
    }

    render() {
        const authors = this.state.authors.map(a => {
            return <AuthorItem key={a.self} self={a.self} firstName={a.firstName} lastName={a.lastName}/>
        });
        return (
            <ul className="list-unstyled">{authors}</ul>
        );
    }
}

class AuthorItem extends React.Component<Author> {
    render() {
        return (
            <li>
                {this.props.firstName + ' ' + this.props.lastName}
            </li>
        );
    }
}


export default AuthorList;