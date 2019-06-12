import React from 'react';
import {CreateBookDialog} from '../dialog/CreateBookDialog';
import {BookRow} from "./BookRow";
import BookGenericComponent from "./BookGenericComponent";

const url = process.env.REACT_APP_URL;

class BookTable extends BookGenericComponent {

    constructor(props: any) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate(title: string, authors: Array<string>, genres: Array<string>) {
        console.log('+BookTable.onCreate');
        fetch(url + '/books', {
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
        console.log('+BookTable.onEdit');
    }

    onDelete(link: string) {
        console.log('+BookTable.onDelete');
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
        console.log('+BookTable.onShowReviews');
    }

    render() {

        const books = this.state.books.map(book => {
            return (<BookRow key={book.selfLink} book={book} onShowReviews={this.onShowReviews} onEdit={this.onEdit}
                             onDelete={this.onDelete}/>);
        });

        return (
            <div className='container'>
                <h1 className='mt-5'>Books</h1>
                <p className='lead'>List of all books in the library:</p>
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
        );
    }
}

export default BookTable;