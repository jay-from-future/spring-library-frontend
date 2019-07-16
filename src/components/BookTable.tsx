import React from 'react';
import {CreateBookDialog} from '../dialog/CreateBookDialog';
import {BookRow} from './BookRow';
import {Alert} from './Alert';
import {Book} from '../domain/Book';

const url = process.env.REACT_APP_URL;

type BookTableState = {
    books: Array<Book>,
    showAccessDeniedError: boolean
}

class BookTable extends React.Component<any, BookTableState> {

    _isMounted = false;

    constructor(props: any) {
        super(props);

        this.state = {
            books: new Array<Book>(),
            showAccessDeniedError: false
        };

        this.loadBooks = this.loadBooks.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    loadBooks() {
        console.log('+loadBooks:' + url);
        const accessToken = localStorage.getItem('access_token');
        fetch(`${url}/books`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
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
                console.error(error);
            });
    };

    componentDidMount(): void {
        this._isMounted = true;
        this.loadBooks();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    onCreate(title: string, authors: Array<string>, genres: Array<string>) {
        console.log('+BookTable.onCreate');
        const accessToken = localStorage.getItem('access_token');
        fetch(`${url}/books`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
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
        console.log('+BookTable.onEdit');
    }

    onDelete(link: string) {
        console.log('+BookTable.onDelete');
        const accessToken = localStorage.getItem('access_token');
        fetch(link, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        ).then(
            (result) => {
                console.log(result);
                if (result.ok) {
                    console.log('successfully deleted');
                    this.loadBooks();
                } else if (result.status === 403) {
                    console.error('access denied');
                    this.setState({showAccessDeniedError: true});
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onShowReviews(link: string) {
        console.log('+BookTable.onShowReviews');
    }

    render() {

        const {showAccessDeniedError} = this.state;

        let error;
        if (showAccessDeniedError) {
            error = <Alert type="alert-danger"
                           message="You do not have required permissions to perform this action!"
                           onClose={() => {
                               this.setState({showAccessDeniedError: false});
                           }}/>;
        }

        const books = this.state.books.map(book => {
            return (<BookRow key={book.selfLink} book={book}
                             onShowReviews={this.onShowReviews}
                             onEdit={this.onEdit}
                             onDelete={this.onDelete}/>);
        });

        return (
            <main role='main' className='flex-shrink-0'>
                <div className='container'>
                    <h1 className='mt-5'>Books</h1>
                    <p className='lead'>List of all books in the library:</p>
                    {error}
                    <table className='table table-bordered'>
                        <thead className='thead-dark'>
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
                    <CreateBookDialog onCreate={this.onCreate}/>
                </div>
            </main>
        );
    }
}

export default BookTable;