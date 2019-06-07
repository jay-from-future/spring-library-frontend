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
    visible: boolean
}

export class ReviewList extends React.Component<ReviewListProps, ReviewListState> {

    constructor(props: Readonly<ReviewListProps>) {
        super(props);
        this.state = {
            reviews: new Array<Review>(),
            visible: false
        };

        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        console.log('+ReviewList.handleClick');
        if (!this.state.visible) {
            this.loadReviews();
        }
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        const visible = this.state.visible;
        let reviews;

        if (visible) {
            reviews = this.state.reviews.map(r => {
                return <ReviewItem review={r.review}/>
            });
        }

        return (
            <div>
                <button type="button" onClick={this.handleClick}>
                    <img src="/img/baseline-chat-24px.svg" alt="Reviews"/>
                </button>
                <div>
                    {reviews}
                </div>
            </div>
        )
    }

}

class ReviewItem extends React.Component<Review> {
    render() {
        return (
            <span className="card">
                <p>{this.props.review}</p>
            </span>
        );
    }
}