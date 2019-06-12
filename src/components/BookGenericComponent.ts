import React from "react";
import {Book} from "../domain/Book";

const url = process.env.REACT_APP_URL;

type BookComponentState = {
    books: Array<Book>
}

export default abstract class BookGenericComponent extends React.Component<any, BookComponentState> {

    _isMounted = false;

    protected constructor(props: any) {
        super(props);

        this.state = {
            books: new Array<Book>()
        };

        this.loadBooks = this.loadBooks.bind(this);
    }

    componentDidMount(): void {
        this._isMounted = true;
        this.loadBooks();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    loadBooks() {
        console.log('+loadBooks:' + url);
        fetch(url + '/books')
            .then(response => response.json())
            .then(result => {
                const books = result._embedded.books.map((b: any) => {
                    const links = b._links;
                    return new Book(
                        b.title,
                        links.self.href,
                        links.authors.href,
                        links.genres.href,
                        links.reviews.href);
                });
                if (this._isMounted) {
                    this.setState({
                        books: books
                    });
                }

            }, error => {
                console.error(error)
            });
    };
}