import {Author} from "../domain/Author";
import React from "react";

const url = process.env.REACT_APP_URL;

type AuthorState = {
    authors: Array<Author>
}

export default abstract class AuthorGenericComponent extends React.Component<any, AuthorState> {

    constructor(props: any) {
        super(props);
        this.state = {authors: new Array<Author>()};
        this.loadAuthors = this.loadAuthors.bind(this);
    }

    componentDidMount(): void {
        this.loadAuthors();
    }

    loadAuthors() {
        console.log('+loadAuthors:' + url);
        fetch(url + '/authors')
            .then(response => response.json())
            .then(result => {
                console.log(result);
                const authors = result._embedded.authors.map((a: any) => {
                    return new Author(a._links.self.href, a.firstName, a.lastName);
                });
                this.setState({authors: authors});
            }, error => {
                console.error(error)
            });
    };

}