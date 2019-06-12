export class Book {
    constructor(private  _title: string,
                private  _selfLink: string,
                private  _authorsLink: string,
                private  _genresLink: string,
                private  _reviewsLink: string) {
    }

    get title(): string {
        return this._title;
    }

    get selfLink(): string {
        return this._selfLink;
    }

    get authorsLink(): string {
        return this._authorsLink;
    }

    get genresLink(): string {
        return this._genresLink;
    }

    get reviewsLink(): string {
        return this._reviewsLink;
    }
}