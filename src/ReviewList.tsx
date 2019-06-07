import React from "react";

class Review {
    constructor(public review: string) {
    }
}

type ReviewListProps = {
    reviewLink: string
}
type ReviewListState = {
    reviews: Array<Review>
}

export class ReviewList extends React.Component<ReviewListProps, ReviewListState> {

    constructor(props: Readonly<ReviewListProps>) {
        super(props);
        this.state = {reviews: new Array<Review>()};
    }

    componentDidMount(): void {
        this.loadReviews();
    }

    loadReviews() {
        fetch(this.props.reviewLink)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                let reviews = result._embedded.reviews.map((r: any) => {
                    return new Review(r.review);
                });
                this.setState({
                    reviews: reviews
                });
            }, error => {
                console.error(error)
            })
    }

    render() {

        const reviews = this.state.reviews.map(r => {
            return <ReviewItem review={r.review}/>
        });
        return (
            <td>{reviews}</td>
        );
    }

}

class ReviewItem extends React.Component<Review> {
    render() {
        return (
            <div>
                <p>
                    {this.props.review};
                </p>
                <p>-----------------------------------</p>
            </div>
        );
    }
}