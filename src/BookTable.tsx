import React from "react";
import {Book} from "./Book";
import AuthorList from "./AuthorList";
import GenreList from "./GenreList";
import {CreateBookDialog} from "./CreateBookDialog";

type BookProps = {
    booksLink: string,
    authorsLink: string,
    genresLink: string,
}

type BookTableState = {
    books: Array<Book>
}

type BookRowProps = {
    book: Book
    onShowReviews: { (link: string): void }
    onEdit: { (link: string): void }
    onDelete: { (link: string): void }
}

class BookTable extends React.Component<BookProps, BookTableState> {

    constructor(props: Readonly<BookProps>) {
        super(props);

        this.state = {
            books: new Array<Book>()
        };

        this.onDelete = this.onDelete.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount(): void {
        this.loadBooks();
    }

    loadBooks() {
        console.log("+BookTable.loadBooks");
        const booksLink = this.props.booksLink;
        fetch(booksLink)
            .then(response => response.json())
            .then(result => {
                let bookArray = result._embedded.books.map((b: any) => {
                    const links = b._links;
                    return new Book(
                        b.title,
                        links.self.href,
                        links.authors.href,
                        links.genres.href,
                        links.reviews.href);
                });
                this.setState({
                    books: bookArray
                });

            }, error => {
                console.error(error)
            })
    }

    onCreate(title: string, authors: Array<string>, genres: Array<string>) {
        console.log("+BookTable.onCreate");
        const booksLink = this.props.booksLink;
        fetch(booksLink, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify({
                title: title,
                authors: authors,
                genres: genres
            })
        })
            .then(
                (result) => {
                    console.log(result);
                    this.loadBooks();
                },
                (error) => {
                    console.error(error);
                }
            );
    }

    onEdit(link: string) {
        console.log("+BookTable.onEdit");
        // fetch(link, {
        //     method: 'PATCH',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         firstParam: 'yourValue',
        //         secondParam: 'yourOtherValue'
        //     })
        // })
        //     .then(
        //         (result) => {
        //             console.log(result);
        //             this.loadBooks();
        //         },
        //         (error) => {
        //             console.error(error);
        //         }
        //     );
    }

    onDelete(link: string) {
        console.log("+BookTable.onDelete");
        fetch(link, {method: 'DELETE'})
            .then(
                (result) => {
                    console.log(result);
                    this.loadBooks();
                },
                (error) => {
                    console.error(error);
                }
            );
    }


    onShowReviews(link: string) {
        console.log("+BookTable.onShowReviews");

    }


    render() {
        const authorsLink = this.props.authorsLink;
        const genresLink = this.props.genresLink;

        const books = this.state.books.map(book => {
            return (<BookRow key={book.selfLink} book={book} onShowReviews={this.onShowReviews} onEdit={this.onEdit}
                             onDelete={this.onDelete}/>);
        });

        return (
            <div className="container">
                <h1 className="mt-5">Books</h1>
                <p className="lead">List of all books in the library:</p>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                    <tr>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Genres</th>
                        <th>Reviews</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books}
                    </tbody>
                </table>
                <CreateBookDialog onCreate={this.onCreate} genresLink={genresLink} authorsLink={authorsLink}/>
            </div>
        );
    }
}

class BookRow extends React.Component<BookRowProps> {

    constructor(props: Readonly<BookRowProps>) {
        super(props);

        this.handleShowReviews = this.handleShowReviews.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleShowReviews(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.props.onShowReviews(this.props.book.selfLink);
    }

    handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.props.onEdit(this.props.book.selfLink);
    }

    handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.props.onDelete(this.props.book.selfLink);
    }

    render() {
        const title = this.props.book.title;
        const authorsLink = this.props.book.authorsLink;
        const genresLink = this.props.book.genresLink;
        const reviewsLink = this.props.book.reviewsLink;

        return (
            <tr>
                <td>{title}</td>
                <td><AuthorList authorsLink={authorsLink}/></td>
                <td><GenreList genresLink={genresLink}/></td>
                {/*<td><ReviewList reviewLink={reviewsLink}/></td>*/}
                <td>
                    <button onClick={this.handleShowReviews}>
                        <img src="/img/baseline-chat-24px.svg" alt="Reviews"/>
                    </button>
                </td>
                <td>
                    <button onClick={this.handleEdit}>
                        <img src="/img/round-edit-24px.svg" alt="Edit book"/>
                    </button>
                </td>
                <td>
                    <button onClick={this.handleDelete}>
                        <img src="/img/round-delete-24px.svg" alt="Remove book"/>
                    </button>
                </td>
            </tr>
        );
    }
}

export default BookTable;