import React from "react";
import AuthorList from "./AuthorList";
import GenreList from "./GenreList";
import {ReviewList} from "./ReviewList";
import {Book} from "../domain/Book";

type BookRowProps = {
    book: Book
    onShowReviews: { (link: string): void }
    onEdit: { (link: string): void }
    onDelete: { (link: string): void }
}

export class BookRow extends React.Component<BookRowProps> {

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
        const {title, reviewsLink} = this.props.book;

        return (
            <tr>
                <td>{title}</td>
                <td><AuthorList/></td>
                <td><GenreList/></td>
                <td>
                    <ReviewList reviewLink={reviewsLink}/>
                </td>
                <td>
                    <button onClick={this.handleEdit} disabled>
                        <img src='/img/round-edit-24px.svg' alt='Edit book'/>
                    </button>
                </td>
                <td>
                    <button onClick={this.handleDelete}>
                        <img src='/img/round-delete-24px.svg' alt='Remove book'/>
                    </button>
                </td>
            </tr>
        );
    }
}