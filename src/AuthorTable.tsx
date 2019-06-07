import React from "react";
import {Author} from "./Author";

type AuthorTableProps = {
    authorsLink: string
}
type AuthorTableState = {
    authors: Array<Author>
}

class AuthorTable extends React.Component<AuthorTableProps, AuthorTableState> {

    constructor(props: Readonly<AuthorTableProps>) {
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
            return <AuthorRow key={a.self} self={a.self} firstName={a.firstName} lastName={a.lastName}/>
        });
        return (
            <div className="container">
                <h1 className="mt-5">Authors:</h1>
                <p className="lead">List of all authors in the library:</p>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors}
                    </tbody>
                </table>
            </div>
        );
    }
}

class AuthorRow extends React.Component<Author> {

    render() {
        return (
            <tr>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
            </tr>
        );
    }
}


export default AuthorTable;